
//signUp Window
function signUp(){
    window.open("signUp.html", "_blank", "width:200 , height:360")
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
  let lastname = document.getElementById('lastname').value;
  let dateOfBirth = document.getElementById('dateOfBirth').value
  let gender = document.querySelector('input[name="gender"]:checked').value
  let street = document.getElementById('street').value
  let city = document.getElementById('city').value
  let postal = document.getElementById('postcode').value
  let country = document.getElementById('country').value
  let email = document.getElementById('email').value
  let mobile = document.getElementById('mobile').value
  let personalUrl = document.getElementById('personalURL').value;
  let userName = document.getElementById('userName').value;
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

         let newData={
            id: userName,
            name: firstname,
            lastname: lastname,
            dateOfBirth: dateOfBirth,
            gender: gender,
            street: street,
            city: city,
            postCode: postal,
            country: country,
            email: email,
            mobile: mobile,
            personalURL: personalUrl,
            password: pass,
            requests: []
         }


         let req = t.add(newData);

         req.onsuccess = function() {


            console.log(req.result)
            console.log(newData);
            alert('Account successfully created!!')
            window.close();
         };

         req.onerror = function() {
                     console.log("Error", req.error);
              }
};


openRequest.onblocked = function() {

};

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
             let lastname = inforesult.lastname;
             let dateOfBirth = inforesult.dateOfBirth;
             let gender = inforesult.gender;
             let street = inforesult.street;
             let city = inforesult.city;
             let postal = inforesult.postCode;
             let country = inforesult.country;
             let email = inforesult.email;
             let personalUrl = inforesult.personalURL;
             let pass = inforesult.password;
             let mobile = inforesult.mobile
             let inforeqs = inforesult.requests;


               inforeqs.push("Hotel Booked: " + hotelName + "<br> People: " + noOfPersons+"<br> Check In: "+checkInDate+"<br> Check Out: "
             + checkOutDate + "<br> Hotel Type: " + hotelType + "<br> Breakfast Required: " + breakfastRequired);

             let Newdata={

              id: loginame,
              name: firstname,
              lastname: lastname,
              dateOfBirth: dateOfBirth,
              gender: gender,
              street: street,
              city: city,
              postCode: postal,
              country: country,
              email: email,
              mobile: mobile,
              personalURL: personalUrl,
              password: pass,
                requests: inforeqs

             }
             let req = t.put(Newdata);

             req.onsuccess = function() {
               alert("Booking succesful!!")
               window.location.href ='index.html'
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

function carBooking(){

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
           let lastname = inforesult.lastname;
           let dateOfBirth = inforesult.dateOfBirth;
           let gender = inforesult.gender;
           let street = inforesult.street;
           let city = inforesult.city;
           let postal = inforesult.postCode;
           let country = inforesult.country;
           let email = inforesult.email;
           let personalUrl = inforesult.personalURL;
           let pass = inforesult.password;
           let mobile = inforesult.mobile
           let inforeqs = inforesult.requests;


             inforeqs.push("Car Booked: " + hotelName + "<br> People: " + noOfPersons+"<br> Start Date: "+checkInDate+"<br> End Date: "
           + checkOutDate + "<br> Car Type: " + hotelType + "<br> Self Drive: " + breakfastRequired);

           let Newdata={

            id: loginame,
            name: firstname,
            lastname: lastname,
            dateOfBirth: dateOfBirth,
            gender: gender,
            street: street,
            city: city,
            postCode: postal,
            country: country,
            email: email,
            mobile: mobile,
            personalURL: personalUrl,
            password: pass,
              requests: inforeqs

           }
           let req = t.put(Newdata);

           req.onsuccess = function() {
             alert("Booking succesful!!")
             window.location.href ='index.html'
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

function airTicketsBooking(){

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
             let lastname = inforesult.lastname;
             let dateOfBirth = inforesult.dateOfBirth;
             let gender = inforesult.gender;
             let street = inforesult.street;
             let city = inforesult.city;
             let postal = inforesult.postCode;
             let country = inforesult.country;
             let email = inforesult.email;
             let personalUrl = inforesult.personalURL;
             let pass = inforesult.password;
             let mobile = inforesult.mobile
             let inforeqs = inforesult.requests;


               inforeqs.push("Airline Booked: " + hotelName + "<br> People: " + noOfPersons+"<br> Depart Date: "+checkInDate+"<br> Return Date: "
             + checkOutDate + "<br> AirLine Type: " + hotelType + "<br> Meal: " + breakfastRequired);

             let Newdata={

              id: loginame,
              name: firstname,
              lastname: lastname,
              dateOfBirth: dateOfBirth,
              gender: gender,
              street: street,
              city: city,
              postCode: postal,
              country: country,
              email: email,
              mobile: mobile,
              personalURL: personalUrl,
              password: pass,
                requests: inforeqs

             }
             let req = t.put(Newdata);

             req.onsuccess = function() {
               alert("Booking succesful!!")
                window.location.href ='index.html'
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

               let name = inforesult.name;
              //  let p = inforesult.password;
               let inforeqs = inforesult.requests;

               var code = "";

             for(var i = 0 ; i < inforeqs.length; i++){

               code += "<li>" + inforeqs[i] + "</li>"
             }

             document.getElementById('custdetails').innerHTML = "<p><h2 class='text-orange'>Hello, " + name +".<br> Your existing id: " + loginame + "</p>"

             document.getElementById("userlist").innerHTML = code;
             }

           }

      }
         openRequest.onblocked = function() {
        };


}
