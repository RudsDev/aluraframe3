/* Aula_4 */



/*/## 4 - O padrão de projeto Module Pattern ##/*/




var stores = ['negociacoes'];
var version = 3;
var dbName = 'aluraframe';

/*Para garantir que sempre teremos a mesma conexão 
sempre que getConnection() for chamada declaramos a
variavel connection fora da classe ConnectionFactory. */
var connection = null;

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

                /*Aqui é verificada a existência de uma conexão.
                Caso já exista alguma criada, não criará outra. */
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

/*Para resolver o problema de termos todas as variaveis
no escopo global da aplicação será utilizado o padrão de
projeto Module Pettern. Esse padrão consite em criar um
módulo ou unidade de código que não pode ser acessada
externamente. Um dos meios de se alcançar esse resultado
seria transportando todo o código de ConnectionFactory e 
as variaveis globais para dentro de uma função. O problema 
dessa abordagem é que não seria possivel acessar
ConnectionFactory e seus métodos. Contorna-se essa situação
adcionando um return antes da definição da classe, ou seja,
a função retorna a classe (que doideira...)!



*/


function tempConnectionFactory() {

    var stores = ['negociacoes'];
    var version = 3;
    var dbName = 'aluraframe';
    
    /*Para garantir que sempre teremos a mesma conexão 
    sempre que getConnection() for chamada declaramos a
    variavel connection fora da classe ConnectionFactory. */
    var connection = null;
    
    return class ConnectionFactory{
    
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
    
                    /*Aqui é verificada a existência de uma conexão.
                    Caso já exista alguma criada, não criará outra. */
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
    
}

var ConnectionFactory = tempConnectionFactory();


/*Para melhorar essa abordagem, pode-se colocar a ConnectionFactory
e as variaveis globais dentro de uma função auto invocada (IIFE).
Com isso impede-se que a função seja chamada diretamente e também
retira-se as variaveis indesejadas do escopo global.*/

var ConnectionFactory = (function tempConnectionFactory() {
    
        var stores = ['negociacoes'];
        var version = 3;
        var dbName = 'aluraframe';
        
        /*Para garantir que sempre teremos a mesma conexão 
        sempre que getConnection() for chamada declaramos a
        variavel connection fora da classe ConnectionFactory. */
        var connection = null;
        
        return class ConnectionFactory{
        
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
        
                        /*Aqui é verificada a existência de uma conexão.
                        Caso já exista alguma criada, não criará outra. */
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

//----------------------------------------------------------------------//
