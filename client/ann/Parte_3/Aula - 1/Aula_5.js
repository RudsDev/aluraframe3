/* Aula_5 */

/*

/## 5 - Só acredito vendo: listando objetos de uma store ##/

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
        var openRequest = window.indexedDB.open('aluraframe', 3);

        openRequest.onupgradeneeded = (event) => {
            console.log('Criando ou atualizando o banco.');
            let myConn = event.target.result;

            if(myConn.objectStoreNames.contains('negociacoes')){
                myConn.deleteObjectStore('negociacoes');
            }

            myConn.createObjectStore('negociacoes',{autoIncrement: true});
        };

        openRequest.onsuccess = (event) => {
            console.log('Foi obtida uma conexão.');
            connection = event.target.result;
        };

        openRequest.onerror = (event) =>  {
            console.log(event.target.error);
        };

        function adciona() {
            let tx = connection.transaction(['negociacoes'],'readwrite'); 

            let store  = tx.objectStore('negociacoes');
            let request = store.add(new Negociacao(new Date(),1,250));

            request.onsuccess = (event)=>{
                console.log('Negociação incluida com sucesso.');
            };

            request.onerror = (event)=>{
                console.log('Negociação não incluída.');
            };
        }


        function listaTodas() {
            let tx = connection.transaction(['negociacoes'],'readwrite'); 

            let store  = tx.objectStore('negociacoes');

            /*Usa-se o cursor para navegar por toda a lista de objetos
            persistidos no objectStore. O objeto cursor é um ponteiro
            usado para a navegação.*/ 
            let cursor = store.openCursor();

            let negociacoes = [];

            cursor.onsuccess = (event)=>{

                //Ponteiro
                let atual = event.target.result;

                //Verificando se há um ponteiro válido.
                if(atual){
                    //Aqui esta de fato a negociacao.
                    let dado = atual.value;

                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    //Passa para a próxima posição na lista.
                    atual.continue();
                }else{
                    console.log(negociacoes);
                }


            };

            cursor.onerror = (event)=>{
                console.log(event.target.error.name);
            };

        }

    </script>
</body>
</html>