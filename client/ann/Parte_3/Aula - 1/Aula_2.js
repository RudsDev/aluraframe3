/* Aula_2 */

/*

/## 2 - Browser possui banco de dados? Conheça o IndexedDB. ##/

/* Aula introdutória aos conceitos básicos do IndexDB.
 Criação de uma conexão e explicação sobre a tríade de eventos
 do IndexDB.*/

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
         /* #2 Realizando solicitação para abertura de conexão com o indexDB.
         Em alguns casos essa conexão pode ser recusada.
         */
         var openRequest = window.indexedDB.open('aluraframe',1);
 
         /*Quando se tenta acessar um banco IndexDB é necessário
         lidar com a tríade de eventos disparados pelo mesmo, que são:
         
         > openRequest.onupgradeneeded - Cria ou altera um banco já existente. 
         
         
         > openRequest.onsuccess - Sempre executada quando obtida uma conexão.
 
 
         > openRequest.onerror - Disparada na ocorrência de erros.
 
         */
 
 
         openRequest.onupgradeneeded = (event) => {
             console.log('Criando ou atualizando o banco.');
         };
 
         
         openRequest.onsuccess = (event) => {
             console.log('Foi obtida uma conexão.');
         };
 
         openRequest.onerror = (event) =>  {
             console.log('Erro!');
             console.log(event.target.error);
         };
 
     </script>
 </body>
 </html>

 /* ------------------------------------------------------ */