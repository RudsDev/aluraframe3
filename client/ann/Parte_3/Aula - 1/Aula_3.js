/* Aula_3 */

/*

/## 3 - Comunicando-se com o banco usando o IDBDatabase ##/

/* */

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Aprendendo Indexed DB</title>
</head>
<body>
    <script>

        //Instância de IDBDataBase
        var connection;

        /*Para forçar uma nova execução de 'onupgradeneeded'
        é necessário alterar a versão da conexão criada
        (segundo parâmetro passado para a função 'open()') 
        para uma versão maior que a definida anteriormente.
        No caso, aqui foi alterada da versão 1 para a
        versão 2.*/
        var openRequest = window.indexedDB.open('aluraframe', 2);

        openRequest.onupgradeneeded = (event) => {
            console.log('Criando ou atualizando o banco.');

            /*Para criar uma objectStore é necessário
            uma instãncia de IDBDataBase. Porém,
            atualmente, só temos acesso a variavel
            connection na chamada de 'onsuccess', que por
            sua vez só é executado após 'onupgradeneeded.
            Para contornar esssa situação, acessaremos 
            a conexão também dentro de 'onupgradeneeded'
            do mesmo jeito que foi feito em 'onsuccess'.*/

            var myConn = event.target.result;
            myConn.createObjectStore('negociacoes');

        };

        openRequest.onsuccess = (event) => {
            console.log('Foi obtida uma conexão.');
            connection = event.target.result;
        };

        openRequest.onerror = (event) =>  {
            console.log(event.target.error);
        };


        /*Antes de realizar qualquer operação a partir da 
        instância obtida é necessário uma ObjectStore.
        Que é um objeto que funciona de forma muito 
        semelhante as tabelas de um banco relacional.
        No entando diferenciam-se de tabelas de um DB
        relacional pelo fato de não possuirem esquemas.

        "Diferente de um banco de dados relacional, 
        em que existem colunas destinadas a texto, números
        e dados, numa Object Store, podemos gravar objetos
        de diferentes formatos, contanto, que sejam
        válidos no JavaScript."
        */




    </script>
</body>
</html>

//------------------------------------------------------------