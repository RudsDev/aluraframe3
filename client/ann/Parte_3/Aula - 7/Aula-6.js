/* Aula_6 */



/*/## 6 - Babel e transcompilação de módulos ##/*/


/*

O arquivo boot.js instanciará a controller, sendo responsável 
por associar os métodos do NegociacaoController com os 
eventos da View. Porém, o nosso código ainda não vai funcionar.
Isto porque estamos usando como loader o system.js, por isso, 
os módulos que o Babel transcompila realizarão a ação usando a 
sintaxe do mesmo arquivo para auxiliar a importação.
O transpiler é importante neste processo porque ele mudará o 
código dos módulos para adequá-los ao loader. 
De volta ao Terminal, na pasta client, instalaremos o novo 
módulo - um plugin do Babel.

> npm install babel-plugin-transform-es2015-modules-systemjs@6.9.0 --save-dev

O plugin transforma o código do ES2015 para usar o SystemJS. 
É fundamental instalá-lo no Babel para que tudo funcione corretamente.

Após fazermos a gravação do plugin, vamos configurar para que o Babel 
utilize o recurso recém instalado, no arquivo .babelrc .

{
   "presets" : ["es2015"],
   "plugins" : ["transform-es2015-modules-systemjs"]
}

Sem a configuração, o Babel não compilará os módulos adequadamente 
para a importação no System.js. Em seguida, no Terminal, vamos 
fazer a compilação com o comando build:

> npm run build


Se analisarmos os arquivos gerados pelo transpiler, localizados 
na pasta app, veremos que aparecerá uma sintaxe nova. 
Por exemplo, no arquivo NegociacaoDao, encontraremos 
o System.register aparecendo no seguinte trecho:

System.register([], function(_export, _context) {
    "use strict";

    var _createClass, NegociacaoDao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }


*/