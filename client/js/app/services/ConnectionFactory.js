var ConnectionFactory = (function tempConnectionFactory() {
    
        var stores = ['negociacoes'];
        var version = 3;
        var dbName = 'aluraframe';
        var connection = null;
        
        return class ConnectionFactory{
        
            constructor(){
                throw new Error('Não é possível criar instâncias dessa classe.');
            }
        
            static getConnection(){
        
                return new Promise((resolve, reject)=>{
        
                    let openRequest = window.indexedDB.open(stores,version);
        
                    openRequest.onupgradeneeded = (event)=>{
                        ConnectionFactory._createStore(event.target.result);
                    };
        
                    openRequest.onsuccess = (event)=>{
        
                        if(!connection)
                            connection = event.target.result;
                        resolve(connection);
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
    })();