
//signUp Window
function signUp(){
    window.open("js/signup.html", "_blank", "width:200 , height:360")
}

createObjectStores();


function createObjectStores(){
  let openRequest = indexedDB.open("exploreTheWorldDb", 1);

openRequest.onupgradeneeded = function() {

console.log("upgrade called")

let db = openRequest.result;

  if (!db.objectStoreNames.contains('userdata')) {

    db.createObjectStore('userdata', {keyPath: 'id'});
  }


};

openRequest.onerror = function() {

    console.log("error called")

};

openRequest.onsuccess = function() {
  //let db = openRequest.result;

    console.log("success called")


};
}

function registerUser(){
    alert('signup')
  let firstname = document.getElementById('name').value;
  let lastname = document.getElementById('userName').value;
  let pass = document.getElementById('password').value;

  if(firstname == "" & lastname == "" & pass == ""){
    alert("Please fill the required fields..");
  }else{



  let openRequest = indexedDB.open("exploreTheWorldDb", 1);
  openRequest.onupgradeneeded = function() {
     console.log("upgrade called")
  };

  openRequest.onerror = function() {
    console.log("error called")
  };

  openRequest.onsuccess = function() {
     let db = openRequest.result;

        console.log("success called")

        db.onversionchange = function() {
        db.close();
         };
         let transaction = db.transaction("userdata", "readwrite");
         let t = transaction.objectStore("userdata");

         let data={
            id: firstname,
            lastname: lastname,
            password: pass,
            requests: []


         }


         let req = t.add(data);

         req.onsuccess = function() {


            console.log(req.result)
            console.log(data);

         };

         req.onerror = function() {
                     console.log("Error", req.error);
              }
};


openRequest.onblocked = function() {

};
document.getElementById('fname').value = ""
document.getElementById('lname').value = ""
document.getElementById('passwordsignup').value = ""
var x = document.getElementById("msg");
x.className = "show";
setTimeout(function() {
  x.className.replace("show", "");
}, 30000);

}
}

function userlogIn(){

  let uname = document.getElementById('username').value;
  let p = document.getElementById('upassword').value;


  if(uname == "" & p == ""){
    alert("Please fill the required feilds....")
  }else {



  let openRequest = indexedDB.open("exploreTheWorldDb", 1);

   openRequest.onupgradeneeded = function() {
       console.log("upgrade called")

       let db = openRequest.result;

         if (!db.objectStoreNames.contains('userlogedin')) {
           db.createObjectStore('userlogedin', {keyPath: 'id'});
         }
    };

     openRequest.onerror = function() {

        console.log("error called")
    };

     openRequest.onsuccess = function() {
        let db = openRequest.result;

         console.log("success called")

        db.onversionchange = function() {
        db.close();

         };
         let transaction = db.transaction("userdata", "readwrite");
         let t = transaction.objectStore("userdata");


         let req = t.get(uname)


         req.onsuccess = function() {
            console.log(req.result)
            var recieved = req.result
            alert(recieved.password)
            if(recieved == null){
              alert("User not registered!!!!")
            }else if (p == recieved.password) {


               saveLoginUser(uname);

            }else {
              alert("Oops!!!  Wrong password")
            }
         };

         req.onerror = function() {
                     console.log("Error", request.error);

              }
     };

     openRequest.onblocked = function() {

       };

     }

}


function saveLoginUser(uname){


let openRequest = indexedDB.open("exploreTheWorldDb", 1);
openRequest.onupgradeneeded = function() {

  console.log("upgrade called")
};

openRequest.onerror = function() {

  console.log("error called")

};


openRequest.onsuccess = function() {
     let db = openRequest.result;

       console.log("success called")


     db.onversionchange = function() {
     db.close();
   };


   let transaction = db.transaction("userdata", "readwrite");
   let t = transaction.objectStore("userdata");

   let r = t.put({id: "logInUser", username: uname});

   r.onsuccess = function(){

     window.location.href = "index.html"

     alert("Login succesful!!!");

   };


}


openRequest.onblocked = function() {
};


}//end of function

function bookhotelfunc(){



   let openRequest = indexedDB.open("exploreTheWorldDb", 1);

      openRequest.onupgradeneeded = function() {

        console.log("upgrade called")
     };

    openRequest.onerror = function() {

        console.log("error called")

    };

    let hname = document.getElementById('hotelname').value
    let hperson = document.getElementById('numperson').value
    let hotelin = document.getElementById('hotelcheckin').value
    let hotelout  = document.getElementById('hotelcheckout').value

   openRequest.onsuccess = function() {
        let db = openRequest.result;

          console.log("success called")

        db.onversionchange = function() {
        db.close();

         };
         let transaction = db.transaction("userdata", "readwrite");
         let t = transaction.objectStore("userdata");


         let r = t.get("logInUser");


         r.onsuccess = function(){
           let reslt = r.result;

           if(reslt == null){
             alert("User not registered!!");
           }else {


           let loginame = reslt.username;
           console.log(loginame);

           let info = t.get(loginame);
           info.onsuccess = function(){

             let inforesult = info.result;

             let ln = inforesult.lastname;
             let p = inforesult.password;
             let inforeqs = inforesult.requests;

             if(hname == "" & hperson == "" & hotelin == "" & hotelout == ""){
               alert("Please fill the required fields!!")
             }else {

               inforeqs.push("Hotel Booked:" + hname + "<br> Persons:" + hperson+"<br> Check In:"+hotelin+"<br> Check Out:"
             + hotelout);

             let Newdata={


                id: loginame,
                lastname: ln,
                password: p,
                requests: inforeqs

             }
             let req = t.put(Newdata);

             req.onsuccess = function() {
               alert("Booking succesful!!")
               document.getElementById('hotelname').value = ""
               document.getElementById('numperson').value = ""
               document.getElementById('hotelcheckin').value = ""
               document.getElementById('hotelcheckout').value = ""

                console.log(req.result)
                console.log(Newdata);

             };
             req.onerror = function() {
                         console.log("Error", request.error);
                  }
          };

           }

         }





         }




    }
       openRequest.onblocked = function() {
      };
}

function bookcarfunc(){



   let openRequest = indexedDB.open("exploreTheWorldDb", 1);

      openRequest.onupgradeneeded = function() {

        console.log("upgrade called")
     };

    openRequest.onerror = function() {

        console.log("error called")

    };

    let cname = document.getElementById('carname').value
    let cperson = document.getElementById('carperson').value
    let carin = document.getElementById('carcheckin').value
    let carout  = document.getElementById('carcheckout').value

   openRequest.onsuccess = function() {
        let db = openRequest.result;

          console.log("success called")

        db.onversionchange = function() {
        db.close();

         };
         let transaction = db.transaction("userdata", "readwrite");
         let t = transaction.objectStore("userdata");


         let r = t.get("logInUser");


         r.onsuccess = function(){
           let reslt = r.result;

           if(reslt == null){
             alert("User not registered!!" )
           }else {


           let loginame = reslt.username;
           console.log(loginame);

           let info = t.get(loginame);
           info.onsuccess = function(){

             let inforesult = info.result;

             let ln = inforesult.lastname;
             let p = inforesult.password;
             let inforeqs = inforesult.requests;

             if(cname == "" & cperson == "" & carin == "" & carout == ""){
               alert("Please fill the required fields!!")
             }else {

               inforeqs.push("Car Booked:" + cname + "<br> Persons:" + cperson+"<br> Check In:"+carin+"<br> Check Out:"
             + carout);

             let Newdata={


                id: loginame,
                lastname: ln,
                password: p,
                requests: inforeqs

             }
             let req = t.put(Newdata);

             req.onsuccess = function() {
               alert("Booking succesful..")
               document.getElementById('carname').value = ""
               document.getElementById('carperson').value = ""
               document.getElementById('carcheckin').value = ""
               document.getElementById('carcheckout').value = ""
                console.log(req.result)
                console.log(Newdata);

             };
             req.onerror = function() {
                         console.log("Error", request.error);
                  }
          };

           }


}


         }




    }
       openRequest.onblocked = function() {
      };
}

function bookairlinefunc(){



   let openRequest = indexedDB.open("exploreTheWorldDb", 1);

      openRequest.onupgradeneeded = function() {

        console.log("upgrade called")
     };

    openRequest.onerror = function() {

        console.log("error called")

    };

    let aname = document.getElementById('airlinename').value
    let aperson = document.getElementById('numpassenger').value
    let airin = document.getElementById('aircheckin').value
    let airout  = document.getElementById('aircheckout').value

   openRequest.onsuccess = function() {
        let db = openRequest.result;

          console.log("success called")

        db.onversionchange = function() {
        db.close();

         };
         let transaction = db.transaction("userdata", "readwrite");
         let t = transaction.objectStore("userdata");


         let r = t.get("logInUser");


         r.onsuccess = function(){
           let reslt = r.result;

           if(reslt == null){
             alert("User not registered!!")
           }else {


           let loginame = reslt.username;
           console.log(loginame);

           let info = t.get(loginame);
           info.onsuccess = function(){

             let inforesult = info.result;

             let ln = inforesult.lastname;
             let p = inforesult.password;
             let inforeqs = inforesult.requests;

             if(aname == "" & aperson == "" & airin == "" & airout == ""){
               alert("Please fill the required fields!!")
             }else {

               inforeqs.push("Airline:" + aname + "<br> Passenger:" + aperson+"<br> Check In:"+airin+"<br> Check Out:"
             + airout);

             let Newdata={


                id: loginame,
                lastname: ln,
                password: p,
                requests: inforeqs

             }
             let req = t.put(Newdata);

             req.onsuccess = function() {
               alert("Booking succesful..")
               document.getElementById('airlinename').value = ""
               document.getElementById('numpassenger').value = ""
               document.getElementById('aircheckin').value = ""
               document.getElementById('aircheckout').value = ""
                console.log(req.result)
                console.log(Newdata);

             };
             req.onerror = function() {
                         console.log("Error", request.error);
                  }
          };

           }


}


         }




    }
       openRequest.onblocked = function() {
      };
}

function showmylist(){


     let openRequest = indexedDB.open("exploreTheWorldDb", 1);

        openRequest.onupgradeneeded = function() {

          console.log("upgrade called")
       };

      openRequest.onerror = function() {

          console.log("error called")

      };



     openRequest.onsuccess = function() {
          let db = openRequest.result;

            console.log("success called")

          db.onversionchange = function() {
          db.close();

           };
           let transaction = db.transaction("userdata", "readwrite");
           let t = transaction.objectStore("userdata");


           let r = t.get("logInUser");


           r.onsuccess = function(){
             let reslt = r.result;
             let loginame = reslt.username;

             console.log(loginame);

             let info = t.get(loginame);
             info.onsuccess = function(){

               let inforesult = info.result;

               let ln = inforesult.lastname;
               let p = inforesult.password;
               let inforeqs = inforesult.requests;

               var code = "";

             for(var i = 0 ; i < inforeqs.length; i++){

               code += "<li>" + inforeqs[i] + "</li>"
             }

             document.getElementById('custdetails').innerHTML = "Hello, " + loginame +" " + ln;

             document.getElementById("userlist").innerHTML = code;
             }

           }

      }
         openRequest.onblocked = function() {
        };


}
