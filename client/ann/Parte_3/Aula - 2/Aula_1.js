/* Aula_1 */



/*/## 1 - Uma conexão ou várias? ##/*/

/* Diferente de conexões ao BD no back-end onde é comum
ter um pool de conexões que permite o copartilhamento
das mesmas, ao se utilizar o IndexDB o normal é sempre
utilizar somente uma conexão. Será criada uma API para
conexão com o Index DB seguinto os seguintes preceitos:

A) O método getConnection() será um método estático,
 ou seja, invocado diretamente na classe.

B) O retorno de getConnection será uma promise, pois
 a abertura de uma conexão é um processo assíncrono.

C) Não importa quantas vezes seja chamado o método
 getConnection(), a conexão retornada deve ser a mesma.

D) Toda conexão possui o método close(), mas o 
programador não pode chamá-lo, porque a conexão é a
mesma para a aplicação inteira. Só o próprio
ConnectionFactory pode fechar a conexão.

*/