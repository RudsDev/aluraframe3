/*Implementação da regra de negócio que diz que a listage de negociações pode ser apagada.

A regra de negócio foi implementada de forma simples. Porém, o código atual requer muito trabalho manual. 
Todo o código de atualização da página é chamado manualmente várias vezes em diferentes locais do código.
Essa abordagem abre margem para que possíveis esquecimentos ocorram e com isso bugs surjam.


/## 2 - E se atualizarmos a view quando o modelo for alterado? ##/
Para contornar esse problema será utilizado o conceito de trigger. 
Um trigger será disparado todas as vezes que o model for atualizado e automaticamente irá atualizar a view.
Esse trigger é uma callback que será executada pelos métodos que alteram o estado do modelo.


/## 3 - API Reflection e as facetas de this ##/
Para resolver o problema ocasionado pelo contexto dinâmico do this na implementação anterior, será utilizada
a API Reflection do Javascript.
Nessa abordagem, junto com a callback passada por parâmetro também será passado um objeto que representará
o contexto em que queremos que o callback seja executado. Esse contexto é utilizado na chamada da função 
Reflect.apply(function(), context, [params]). 


/## 4 - Arrow function e seu escopo léxico ##/
O this de uma arrow function é léxico, diferentemente do this de uma função normal
que é dinâmico. Ou seja, o this de uma arrow function não muda de acordo com o 
contexto, ele mantém o ponteiro apontando para o contexto inicial no qual a
arrow function foi definida. Com isso, o problema que ocorreu na implementação feita
no video #2 deixará de existir, uma vez que o contexto da callback conitnuará sendo
NegociacaoController.


/## 5 - O padrão de projeto Observer [TEXTO] ##/
"No final deste capítulo implementamos uma solução para automatizar o processo de
atualização da view toda vez que o modelo mudar. O que fizemos na verdade foi 
implementar o padrão de projeto Observer. "Usamos o padrão de projeto Observer
sempre que queremos notificar partes do sistema interessadas quando um evento
importante for disparado em nosso sistema."



OBS: Uma outra opção seria o uso de uma variavel extra que guardaria uma referência para
NegociacaoController.

ex:

class NegociacaoController {

    constructor() {

        // a variável self guarda uma referência para this, instância de NegociacaoController
        let self = this;

        // aqui usei uma function tradicional, mas poderia ser uma arrow function também
        this._listaNegociacoes = new ListaNegociacoes(function(model) { 
            self._negociacoesView.update(model);
        });
    }

    // código posterior omitido
}

*/


class ListaNegociacoes{

    /* #4 - O contexto é recebido via construtor. */
    constructor(trigger){
        this._contexto = contexto;
        this._trigger = trigger;
    }


    /* #3 - O contexto é recebido via construtor. */
    /*constructor(contexto, trigger){
        this._contexto = contexto;
        this._trigger = trigger;
        this._negociacoes = [];
    }*/

    /* #2 - Ao chamar o trigger o erro 'Cannot read property 'update' of undefined'
    é lançado. 
    Isso ocorre pois a função trigger foi executada em um contexto dinâmico 
    devido ao uso do 'this'. O 'this' no contexto em que está sendo utilizado
    ao se chamar o trigger faz referência para ListaNegociacoes e a função 
    'update()' [que é chamada dentro do callback] não existe no contexto de 
    ListaNegociacoes.
    
    "O this dentro de uma função, para ser avaliado, depende do contexto no qual ela
    foi executada - no caso, o contexto será de ListaNegociacoes. Então, this
    é a _listaNegociacoes, porém, esta não tem _negociacoesView.
    Para resolver, precisamos que o this seja NegociacaoController, porque toda 
    função JavaScript tem o escopo this dinâmico, que varia de acordo com o contexto."

     */
    adciona(negociacao){ 
        this._negociacoes.push(negociacao);
        /* #4 - Como o callback é uma arrow_function o contexto de this
        se mantém o mesmo da definição do callback (NegociacaoController) 
        pois por padrão o this de uma arrow function é léxico.
        Isso evita os problemas decorrentes do uso de this com contexto
        dinâmico.
        Essa é uma feature muito interessante do ES6 qu deve ser
        aproveitada em sua totalidade.*/
        this._trigger(this);
        }


    get negociacoes(){
        return [].concat(this._negociacoes);
    }


    esvaziarLista(){
        this._negociacoes = [];
        /* #4 - */
        this._trigger(this);
    }

}

//=============================================//

class NegociacaoController {

    constructor(){

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        /* #2 - Foi passado um callback para ser utilizado dentro dos métodos
        do modelo que alteram seu estado.*/
        /*#3 - Agora também é passado o objeto this que será usado como 
        contexto de execução da callback */
        /*this._listagem = new ListaNegociacoes(this, function(model){

            /-*#2 Um erro será lançado, pois o this terá um contexto
            diferente quando chamado pelo callback dentro de
            outros métodos.
            Resumindo, o 'this' que chama '_negociacaoView.update()'
            na verdade será ListaNegociacoes no momento em que a 
            chamada de fato for realizada (em runtime).
            *-/
            this._negociacaoView.update(model);
        });*/
        
        /* #4 - Passando o callback utilizando uma "arrow function".
         */
        this._listagem = new ListaNegociacoes((model)=>
            this._negociacaoView.update(model));


        this._negociacaoView = new NegociacoesView($('#negociacoesView'));
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        
        //Atualiza a view na primeira execução.
        this._negociacaoView.update(this._listagem);

        Object.freeze(this);
    }


    adiciona(event){

        event.preventDefault();

        this._listagem.adciona(this._criarNegociacao());
        this._limpaFormulario();
        this._negociacaoView. update(this._listagem);
        this._mensagem.texto = "Negociação adcionada com sucesso!"

        //Agora atualização acontecerá por meio do trigger
        //this._mensagemView.update(this._mensagem);

        console.log(this._listagem.negociacoes);
    }

    esvaziarLista(){

        this._listagem.esvaziarLista();
        this._negociacaoView.update(this._listagem);

        this._mensagem.texto = 'Negociações apagadas com sucesso!';
        
        //Agora atualização acontecerá por meio do trigger
        this._mensagemView.update(this._mensagem);

    }

    _criarNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 0;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}

//=============================================//

class NegociacoesView extends View{

    constructor(element){
        super(element);
    }

    _template(model){
        return `    
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>

                ${model.negociacoes.map(negociacao =>{

                    return `
                        <tr>
                            <td>${DateHelper.dataParaTexto(negociacao.data)}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                            <td>${negociacao.obterVolume()}</td>
                        </tr>
                    `;

                }).join('')}

            </tbody>
            
            <tfoot>

            <td colspan="3"></td>
            <td>
                ${model.negociacoes.reduce((total,n) => total + n.obterVolume(),0)}
            </td>
            </tfoot>
        </table>`;
    }
}

//=============================================//

class View {

    constructor(element){
        this._element = element;
    }

    _template(){
        throw new Error('O método _template() deve ser implementado!');
    }

    update(model){
        this._element.innerHTML = this._template(model);
    }
}