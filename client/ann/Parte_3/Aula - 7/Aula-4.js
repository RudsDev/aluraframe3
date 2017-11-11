/* Aula_4 */



/*/## 4 - SystemJS ##/*/

/* Apesar de toda a refatoração feita usando exports e imports 
no nosso código, a aplicação não irá funcionar. 


"a especificação ES2015 define o import e export, além de que
cada script é um módulo independente. No entanto, não 
definimos como estes módulos devem ser carregados no navegador.
Não existe um consenso... Precisamos que os scripts sejam 
carregados em uma determinada ordem no seu sistema, definindo 
apenas o primeiro. A partir deste, serão carregados os demais. 
O responsável pelo processo é loader, porém, não existe um 
padrão nos navegadores. Para resolver a questão, teremos que 
escolher uma biblioteca de terceiro que atue como um loader 
de script. Uma biblioteca muito famosa é SystemJS. 
Nós iremos baixá-lo pelo NPM do Node.JS."

> npm install systemjs@0.19.31 --save [sem o -dev, only producao]


"Nós vamos especificar para o systemjs qual será o primeiro
 módulo carregado, e automaticamente, ele baixará os demais 
 scripts na ordem de dependência. Ou seja, o desenvolvedor não 
 precisará mais se preocupar com a ordem. 
 
 
 O systemjs tem a variável global System. Quando definimos true
 para defaultJSExtensions, isto nos permite omitir as extensões 
 JS dos imports. Como em NegociacaoController.js, que fizemos 
 as importações sem adicionar a extensão js
 
 "


*/