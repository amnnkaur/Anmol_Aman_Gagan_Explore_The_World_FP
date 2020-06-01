// alert("Script is working")

(() => {

    if('indexedDb' in window){
        console.log('Your browser doesn\'t support indexedDb database')
        return
    }

    //indexedDb code
    // let btn = document.querySelector(".btn")
    // btn.addEventListener("click", addData)

})();


function onLoginPressed(){

    const dbname = "websiteDB"
            const requestDB = window.indexedDB.open(dbname)

            requestDB.onupgradeneeded = () =>{
                let db =requestDB.result
                let store = db.createObjectStore("book",{autoIncrement: true})
                // put method
                store.put({title: "2 States", author:"Anmol"})
                store.put({title: "1 State", author:"Anmol"})
            }

            requestDB.onsuccess = () => {
                if(requestDB.readyState == "done"){
                    console.log("Data is successfully inserted")
                }
            }

}