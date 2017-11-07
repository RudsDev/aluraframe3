var stores = ['negociacoes'];
var version = 3;
var dbName = 'aluraframe';

class ConnectionFactory{

    constructor(){
        throw new Error('Não é possível criar instâncias.');
    }

    static getConnection(){

        return new Promise((resolve, reject)=>{

            let openRequest = window.indexedDB.open(stores,version);

            openRequest.onupgradeneeded = (event)=>{
                
                ConnectionFactory._createStore(event.target.result);

            };

            openRequest.onsuccess = (event)=>{
                resolve(event.target.result);
            };

            openRequest.onerror = (event)=>{
                console.log(event.target.error);
                reject(event.target.error.name);
            };
        });
    }

    static _createStore(conn){
        stores.forEach((store)=>{
            if(conn.objectStoreNames.contains(store))
                conn.deleteObjectStore(store);
            conn.createObjectStore(store,{autoincrement:true})
        });
    }

}