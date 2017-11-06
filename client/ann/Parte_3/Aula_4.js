/* Aula_4 */

/*

/## 4 - Quero gravar em uma Object Store, mas onde está a transação? ##/

*/


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Aprendendo Indexed DB</title>
</head>
<body>

    <script src="js/app/models/Negociacao.js"></script>
    <script>

        var connection;

        /*Uma nova versão do objectStore terá que ser criada. Por isso
        atualizamos a versão para uma maior.*/
        var openRequest = window.indexedDB.open('aluraframe', 3);

        openRequest.onupgradeneeded = (event) => {
            console.log('Criando ou atualizando o banco.');
            let myConn = event.target.result;

            if(myConn.objectStoreNames.contains('negociacoes')){
                myConn.deleteObjectStore('negociacoes');
            }

            /*Para a inserção de dados numa store é necessário que
            cada item salvo tenha o seu ID. Para isso foi usado o
            parametro 'autoincrement' setado como true.*/
            myConn.createObjectStore('negociacoes',{autoIncrement: true});


            /*OBS: Ao se alterar a versão de uma objectStore 
            todos os dados contidos na mesma são perdidos. Pois
            na verdade a objectStore foi destruída e una nova 
            foi criada.
            Caso haja a necesidade de se salvar os dados existentes
            na objectStore anttiga, toda a lógica para se salvar 
            os dados deve ser feita antes de se criar a nova versão.*/

        };

        openRequest.onsuccess = (event) => {
            console.log('Foi obtida uma conexão.');
            connection = event.target.result;
        };

        openRequest.onerror = (event) =>  {
            console.log(event.target.error);
        };


        //Função que guardará uma transação no objectStore.
        function adciona() {

            /*Abrindo uma transação que será utilizada para guardar 
            o objeto dentro da store. 
            Recebe como parâmetro um array com os nomes das objectStores
            alvos da transação e uma string contendo o tipo de operação
            desejada.*/
            let tx = connection.transaction(['negociacoes'],'readwrite'); 

            //Obtendo a objectStore
            let store  = tx.objectStore('negociacoes');

            //Fazendo uma requisição de gravação na store
            let request = store.add(new Negociacao(new Date(),1,250));

            //Caso a requisição ocorra normalmente
            request.onsuccess = (event)=>{
                console.log('Negociação incluida com sucesso.');
            };

            //Caso haja algum erro durante a requisição
            request.onerror = (event)=>{
                console.log('Negociação não incluída.');
            };

        }

    </script>
</body>
</html>


/* ------------------------------------------------------------------*/