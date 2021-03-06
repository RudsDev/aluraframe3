/* Aula_2 */



/*/## 2 - A classe ConnectionFactory ##/*/


/*A classe ConnectionFactory deve ser o
mais generérica possivel para que se possa utiliza-la
para criar outros bancos/conexões.
Para tal serão utilizadas variaveis que receberão
os dados dos bancos/conexões a serem criados.
Contudo, devido ao fato de ConnectionFactory ser uma 
classe que não permite a criação de instâncias, 
não é possivel declarar os atributos dentro do 
construtor da classe, como é de costume./*

/*
Temporariamente será feito essa gamby tenebrosa
apenas para fins didáticos.  */
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