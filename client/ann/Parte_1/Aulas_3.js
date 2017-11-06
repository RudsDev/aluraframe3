
class NegociacaoControllerXP {


    /*Para evitar acessar o DOM varias vezes desnecessariamente
    colocamos os elementos que poderiam ser acessados a cada nova
    instância dentro do construtor da classe.
    Com isso, quando o objeto for instanciado não será necessário
    realizar novas buscas no DOM para obter os elementos
    referenciados. É uma boa prática e favorece a performance.
    */

    constructor(){

        /*Simulando a chamada a elementos similar a feita no Jquery.
        O método querySelector de document foi atribuído a variavel
        $ e foi usada a função bind() para que querySelector continue
        sendo executado dentro do contexto de document.
        Sem o uso da função bind() o contexto de querySelector
        não seria mais o do objeto document(o qual querySelector depende
        para funcionar) e sim  o contexto da variavel a qual ele foi
        atribuído.*/
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        /*Minha solução para gerar a data usando o construtor no
        formato new Date(year, month, day).
        OBS: Esqueci da existência do Array.map()*/
        this._criarData = function (data){

            let arDate = data.split('-');
            let year = arDate[0];
            let day = arDate[2];
            let month = arDate[1]-1;

            return new Date(year, month, day);
        }



        /* ### SPREAD(...) ### */
        /*Em JS6 existe o operador spread (...) que desmembra
        um array de forma que cada posição do array será
        um valor isolado. */

        /*Solução do instutor (utilizando spread) e a função
        map do objeto Array para gerar a data usando o 
        construtor no formato new Date(year, month, day)*/
        this._criarDataSpread = function (data){

            return new Date(
                    ...data.split('-') //usando spread!
                    .map(function(item, index){
                        if(index==1)
                            return item-1;
                        return item;
                    })
                );
        }


        /* ### Arrow Function (=>) ### */

        this._criarDataArrow = function (data){

            return new Date(
                    ...data.split('-')
                    .map((item, index) => item - index % 2));
        }

        Object.freeze(this);
    }


    adiciona(event){

        event.preventDefault();
        /*console.log(this._inputData.value);
        console.log(this._inputQuantidade.value);
        console.log(this._inputValor.value);*/

        //console.log(this._criarData(this._inputData.value));
        //console.log(this._criarDataSpread(this._inputData.value));

        let negociao = new Negociacao(

            /*Exemplo 1 de criação de objetos do tipo Date*/
            //new Date(this._inputData.value.split('-')),
            
            /*Exemplo 2 de criação de objetos do tipo Date*/
            //new Date(this._inputData.value.replace(/-/g,',')),
            
            /*Exemplo 3 de criação de objetos do tipo Date*/
            //this._criarDataSpread(this._inputData.value),

            /*Exemplo 4 de criação de objetos do tipo Date*/
            this._criarDataArrow(this._inputData.value),

            this._inputQuantidade.value,
            this._inputValor.value);
        
        console.log(negociao);

    }

     

}