/* Aula_2 */



/*/## 2 - Comparação entre objetos ##/*/



/*

var hoje = new Date();
var n1 = new Negociacao(hoje, 1, 100);
var n2 = new Negociacao(hoje, 1, 100);

n1 == n2 // o resultado é false

"Nós criamos a variável n1, e esta apontará para algo que
 está na memória. Quando executamos o new Negociacao, o
 JavaScript criará o objeto Negociacao, em que teremos a
 data, a quantidade e o valor. A variável n1 apontará 
 para o objeto recém criado na memória. N1 é uma variável
 de referência que o programa tem para acessar o objeto
 que está na memória, que criamos com o new. Quando 
 criamos o N2 e damos new Negociacao, criaremos um novo
 objeto em memória do tipo Negociacao, que terá a data
 de hoje, a quantidade e o valor. O N1 apontará para o
 objeto na memória. Ou seja, N1 e N2 apontará para
 objetos diferentes. 
 Então, quando digitamos o n1 == n2, o que o JavaScript
 faz é verificar se a variável em 1 está apontando para
 outra. Como ele não está, o retorno será falso. Por 
 isso, o indexOf não funcionou, porque ele também 
 utilizou o == por debaixo dos panos."


var x = 10;
var y = 10;

x == y // o resultado é true

"Quando usamos o == com tipos literais (ou tipos 
primitivos, em Java), como string, number e boolean, ele
não verificará se as variáveis apontam para o mesmo
objeto da memória, ele compara se os valores são iguais."


 // o resultado é true
n1.data.getDate() == n2.data.getDate() && 
n1.quantidade == n2.quantidade && n1.valor == n2.valor

"O retorno será verdadeiro. A nossa comparação não foi
 feita entre as variáveis, mas sim, entre as duas 
 propriedades diretamente. Como estas eram do tipo literal, 
 a comparação deu certo. No entanto, e se o objeto tivesse
 100 propriedades? 
Uma estratégia que podemos utilizar é transformar o objeto
em uma string. Já vimos que com json.parse transformamos o
objeto em uma string. 

Usaremos o JSON.stringify():
JSON.stringify(n1) == JSON.stringify(n2) // o resultado é true"

*/