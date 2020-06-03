
//signUp Window
function signUp(){
    window.open("js/signup.html", "_blank", "width:200 , height:360")
}

function formWindow(){
    window.open('hotelForm.html','_blank', "width:200 , height:360")
}

function backButton(){
    window.open('hotelForm.html','_blank', "width:200 , height:360")
}

let loggedInId = "";

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
    // alert('signup')
  let firstname = document.getElementById('name').value;
  let lastname = document.getElementById('userName').value;
  let pass = document.getElementById('password').value;
  let mobile = document.getElementById('mobile').value;
  let userName = document.getElementById('userName').value;

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

         let newData={
            id: userName,
            name: firstname,
            mobile: mobile,
            password: pass,
            requests: []
         }

        //  let data={
        //     id: firstname,
        //     lastname: lastname,
        //     password: pass,
        //     requests: []


        //  }


         let req = t.add(newData);

         req.onsuccess = function() {


            console.log(req.result)
            console.log(newData);
            alert('Account successfully created!!')
            // window.location.href = '../login.html'
            window.close();
         };

         req.onerror = function() {
                     console.log("Error", req.error);
              }
};


openRequest.onblocked = function() {

};
// document.getElementById('fname').value = ""
// document.getElementById('lname').value = ""
// document.getElementById('passwordsignup').value = ""
// var x = document.getElementById("msg");
// x.className = "show";
// setTimeout(function() {
//   x.className.replace("show", "");
// }, 30000);

}
}

function userlogIn(){

  let userName = document.getElementById('userName').value;
  let p = document.getElementById('password').value;


  if(userName == "" & p == ""){
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


         let req = t.get(userName)


         req.onsuccess = function() {
            console.log(req.result)
            var recieved = req.result
            if(recieved == null){
              alert("User not registered!!!!")
            }else if (p == recieved.password) {

                loggedInId = recieved.id
                
               saveLoginUser(userName);
            //    alert("Welcome " + recieved.name +" !! Your id is: "+ loggedInId )

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


function saveLoginUser(userName){


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

   let r = t.put({id: "logInUser", username: userName});

   r.onsuccess = function(){

     window.location.href = "index.html"

     alert("Login succesful!!!");

   };


}


openRequest.onblocked = function() {
};


}//end of function

function hotelBooking(){
   
   let openRequest = indexedDB.open("exploreTheWorldDb", 1);

      openRequest.onupgradeneeded = function() {

        console.log("upgrade called")
     };

    openRequest.onerror = function() {

        console.log("error called")

    };

    let hotelName = document.getElementById('form-name').value
    let checkInDate = document.getElementById('form-checkIN').value
    let checkOutDate = document.getElementById('form-checkOUT').value
    let hotelType = document.querySelector('input[name="hotel-type"]:checked').value
    let breakfastRequired = document.querySelector('input[name="hotel-breakfast"]:checked').value
    let noOfPersons = document.querySelector('input[name="no-of-people"]:checked').value

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

             let firstname = inforesult.name;
             let pass = inforesult.password;
             let mobile = inforesult.mobile
             let inforeqs = inforesult.requests;


               inforeqs.push("Hotel Booked: " + hotelName + "<br> People: " + noOfPersons+"<br> Check In: "+checkInDate+"<br> Check Out: "
             + checkOutDate + "<br> Hotel Type: " + hotelType + "<br> Breakfast Required: " + breakfastRequired);

             let Newdata={

                id: loginame,
                name: firstname,
                mobile: mobile,
                password: pass,
                requests: inforeqs

             }
             let req = t.put(Newdata);

             req.onsuccess = function() {
               alert("Booking succesful!!")

                console.log(req.result)
                console.log(Newdata);

             };
             req.onerror = function() {
                         console.log("Error", request.error);
                  } 
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

function airTicketsBooking(){



//    let openRequest = indexedDB.open("exploreTheWorldDb", 1);

//       openRequest.onupgradeneeded = function() {

//         console.log("upgrade called")
//      };

//     openRequest.onerror = function() {

//         console.log("error called")

//     };

//     let aname = document.getElementById('airlinename').value
//     let aperson = document.getElementById('numpassenger').value
//     let airin = document.getElementById('aircheckin').value
//     let airout  = document.getElementById('aircheckout').value

//    openRequest.onsuccess = function() {
//         let db = openRequest.result;

//           console.log("success called")

//         db.onversionchange = function() {
//         db.close();

//          };
//          let transaction = db.transaction("userdata", "readwrite");
//          let t = transaction.objectStore("userdata");


//          let r = t.get("logInUser");


//          r.onsuccess = function(){
//            let reslt = r.result;

//            if(reslt == null){
//              alert("User not registered!!")
//            }else {


//            let loginame = reslt.username;
//            console.log(loginame);

//            let info = t.get(loginame);
//            info.onsuccess = function(){

//              let inforesult = info.result;

//              let ln = inforesult.lastname;
//              let p = inforesult.password;
//              let inforeqs = inforesult.requests;

//              if(aname == "" & aperson == "" & airin == "" & airout == ""){
//                alert("Please fill the required fields!!")
//              }else {

//                inforeqs.push("Airline:" + aname + "<br> Passenger:" + aperson+"<br> Check In:"+airin+"<br> Check Out:"
//              + airout);

//              let Newdata={


//                 id: loginame,
//                 lastname: ln,
//                 password: p,
//                 requests: inforeqs

//              }
//              let req = t.put(Newdata);

//              req.onsuccess = function() {
//                alert("Booking succesful..")
//                document.getElementById('airlinename').value = ""
//                document.getElementById('numpassenger').value = ""
//                document.getElementById('aircheckin').value = ""
//                document.getElementById('aircheckout').value = ""
//                 console.log(req.result)
//                 console.log(Newdata);

//              };
//              req.onerror = function() {
//                          console.log("Error", request.error);
//                   }
//           };

//            }


// }


//          }




//     }
//        openRequest.onblocked = function() {
//       };


let openRequest = indexedDB.open("exploreTheWorldDb", 1);

      openRequest.onupgradeneeded = function() {

        console.log("upgrade called")
     };

    openRequest.onerror = function() {

        console.log("error called")

    };

    let hotelName = document.getElementById('form-name').value
    let checkInDate = document.getElementById('form-checkIN').value
    let checkOutDate = document.getElementById('form-checkOUT').value
    let hotelType = document.querySelector('input[name="hotel-type"]:checked').value
    let breakfastRequired = document.querySelector('input[name="hotel-breakfast"]:checked').value
    let noOfPersons = document.querySelector('input[name="no-of-people"]:checked').value

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

             let firstname = inforesult.name;
             let pass = inforesult.password;
             let mobile = inforesult.mobile
             let inforeqs = inforesult.requests;


               inforeqs.push("Airline Booked: " + hotelName + "<br> People: " + noOfPersons+"<br> Depart Date: "+checkInDate+"<br> Return Date: "
             + checkOutDate + "<br> AirLine Type: " + hotelType + "<br> Meal: " + breakfastRequired);

             let Newdata={

                id: loginame,
                name: firstname,
                mobile: mobile,
                password: pass,
                requests: inforeqs

             }
             let req = t.put(Newdata);

             req.onsuccess = function() {
               alert("Booking succesful!!")

                console.log(req.result)
                console.log(Newdata);

             };
             req.onerror = function() {
                         console.log("Error", request.error);
                  } 
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
