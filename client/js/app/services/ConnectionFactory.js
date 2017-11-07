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

            openRequest.onupgradeneeded((event)=>{
                
            })

            openRequest.onsuccess((event)=>{
                
            })

            openRequest.onerror ((event)=>{
                
            })
        });
    }
}