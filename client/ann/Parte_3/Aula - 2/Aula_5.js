/* Aula_5 */


/*/## 5 - Monkey Patch: grandes poderes trazem grandes responsabilidades ##/*/


/* Para finalizar a classe ConnectionFactory falta atender um último
requisito: 

D) Toda conexão possui o método close, mas o programador não
pode chamá-lo, porque a conexão é a mesma para a aplicação inteira.


Para tal, será usado um "Monkey patch", ou seja, a API será alterada
a força.


*/


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
                        /*Antes de sobrescrever o método close da API
                        atribuimos o mesmo a variavel close.
                        Isso é feito para que seja possivel fechar
                        uma conexão mesmo após sobrescrever o método
                        close da API.*/
                        close = connection.close.bind(connection);
                        
                        //Monkey patch
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


        /*Função que será responsável por fechar a conexão.
            */
        static closeConnection(){
            if(connection){
                //Fecha a conexão pela API.
                close();

                /*Atribui null a connection para que
                uma nova conexão seja criada.*/
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