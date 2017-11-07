var ConnectionFactory = (function tempConnectionFactory() {
    
    const stores = ['negociacoes'];
    const version = 3;
    const dbName = 'aluraframe';
    
    var connection = null;
    var close = null;
    
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
    
                    if(!connection){
                        connection = event.target.result;
                        close = connection.close.bind(connection);
                        connection.close = ()=>{
                            throw new Error('Essa conexão não pode ser fechada diretamente.');
                        }
                    }
                    resolve(connection);
                };
    
                openRequest.onerror = (event)=>{
                    console.log(event.target.error);
                    reject(event.target.error.name);
                };
            });
        }

        static closeConnection(){
            if(connection){
                close();
                connection = null;
            }
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