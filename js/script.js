// alert("Script is working")

(() => {

    if('indexedDb' in window){
        console.log('Your browser doesn\'t support indexedDb database')
        return
    }

})();


function onLoginPressed(usrName, pssword){
    // alert(userName + " ," + password)

    const dbname = "websiteDB"
            const requestDB = window.indexedDB.open(dbname)

            requestDB.onupgradeneeded = () =>{
                let db =requestDB.result
                let store = db.createObjectStore("loginCredentials",{autoIncrement: true})
                // put method
                store.put({userName: usrName, password: pssword})
                // store.put({title: "1 State", author:"Anmol"})
            }

            requestDB.onsuccess = () => {
                if(requestDB.readyState == "done"){
                    console.log("Data is successfully inserted")
                }
            }

}