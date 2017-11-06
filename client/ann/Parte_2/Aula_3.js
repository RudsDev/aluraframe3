/* Aula_3 E se alguém criasse nossos proxies? O Padrão de Projeto Factory.*/

/*

/## 1 - Padrão de Projeto Factory ##/

O código de implementação do Proxy utilizado para atualizar as views do 
sistema foi escrito de forma verborrágica. O que dificulta a legibilidade
e manutenibilidade do mesmo. Para simplicar a implementação será 
usado o design pattern Factory para gerar os proxys.
Consequentemente o código ficará mais flexível e sua reusabilidade
também aumentará.

OBS: Essa abordagem ainda não está completa. A mensagem de item 
incluído não esta sendo mais exibida com essa implementação.



/## 2 - Nosso proxy ainda não está 100%! ##/

Serão realizadas algumas alterações na ProxyFactory para habilitar os
proxys gerados por essa fábrica a interceptar propriedades, não só
somente métodos, como era antes.
Para isso será adicionado um interceptador para o setter do objeto 
encapsulado. Com isso o proxy esta habilitado a ter suas traps 
disparadas também prar propriedades.


/## 3 - Isolando a complexidade de associar o modelo com a view na classe Bind ##/

Uma classe de ligação (services/Bind.js) foi criada para isolar a
associação do modelo com a view, onde o construtor dessa classe
usa a ProxyFactory para retornar um objeto (por mais estranho que
pareça construtores em ES6 podem retornar valores e mais que isso,
retornar objetos de outros tipos que não o tipo da classe desse
construtor). 
Chamamos o processo de fazer uma associação entre o modelo
e a View (atualizando a View a cada alteração do modelo)
de Data Biding Unidirecional.


/## 4 - Parâmetros REST ##/

Foram feitas alterações no NegociacaoController e na classe Bind 
para permitir o uso de parâmetros rest/rest operator(...).


*/


class ListaNegociacoes{

    constructor(){
        this._contexto = contexto;
    }


    adciona(negociacao){ 
        this._negociacoes.push(negociacao);
    }


    get negociacoes(){
        return [].concat(this._negociacoes);
    }


    esvaziarLista(){
        this._negociacoes = [];
    }

}

//=============================================//

class NegociacaoController {
    
        constructor(){
    
            let $ = document.querySelector.bind(document);
            let _self = this;
    
            this._inputData = $('#data');
            this._inputQuantidade = $('#quantidade');
            this._inputValor = $('#valor');
    
            /* #1 - Utilizando factory de proxys*/
            this._listagem = ProxyFactory
                .create(new ListaNegociacoes(),
                        ['adiciona', 'esvazia'],
                        model =>{this._mensagemView.update(model)}
                );
    
            this._negociacaoView = new NegociacoesView($('#negociacoesView'));
            this._negociacaoView.update(this._listagem);
    

            /* #1 - Utilizando factory de proxys*/
            this._mensagem = ProxyFactory
                .create(new Mensagem(),
                        ['texto'],
                        model=>{this._mensagemView.update(model)});

            this._mensagemView = new MensagemView($('#mensagemView'));
            

            Object.freeze(this);
        }
    
    
        adiciona(event){
    
            event.preventDefault();
            this._listagem.adiciona(this._criarNegociacao());
            this._limpaFormulario();
        }
    
        esvaziarLista(){
            this._listagem.esvaziarLista();
            this._mensagem.texto = 'Negociações apagadas com sucesso!';
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

//--------------------------------------------//

class ListaNegociacoes{
    
        constructor(trigger){
            this._trigger = trigger;
            this._negociacoes = [];
        }
    
        adiciona(negociacao){
            this._negociacoes = [].concat(this._negociacoes, negociacao);
        }
    
        apagarLista(){
            this._negociacoes = [];
        }
    
        get negociacoes(){
            return [].concat(this._negociacoes);
        }
    
        esvaziarLista(){
            this._negociacoes = [];
        }
    
    }

    /* ============================================================== */

    /* #1 - Implementação do factory de proxes. 
    
     - object: objeto que será encapsulado pelo Proxy.

     - props: array com o nome das propriedades que serão inteceptadas.

     - action: função que deverá ser executada ao se interceptar as
               propriedades monitoradas.

    */

    class ProxyFactory{
        
        static create(object, props, action){
    
            return new Proxy(object, {
                /* #1 - 
                
                - target: referencia o objeto original que esta sendo
                encapsulado.

                - prop: propriedade que esta sendo acessada.

                - receiver: referencia para o próprio proxy.

                */
    
                get:function(target, prop, receiver){
                    if(props.includes(prop) && typeof(target[prop])==typeof(Function)){
                        return function () {
                            console.log(`Interceptando ${prop}`);
                            Reflect.apply(target[prop], target, arguments);
                            return action(target);
                        }
                    }
                    return Reflect.get(target, prop, receiver);
                },

                /*#2 - O objeto proxy gerado por ProxyFactory não esta preparado para
                acessar propriedades, apenas métodos. 
                Os getters e setters de uma classe são acessados como sendo 
                propriedades e não como métodos. Devido a essa particularidade é 
                necessário adcionar um subtefúrgio para lidar com essas propriedades. 
                Isso é feito criando um interceptador também para os setters do objeto
                encapsulado. 
                
                - target: referencia o objeto original que esta sendo
                encapsulado.

                - prop: propriedade que esta sendo acessada.

                - value: valor que será atribuído.

                - receiver: referencia para o próprio proxy.  

                */
                set: function(target, prop, value, receiver){

                    if(props.includes[prop]){
                        target[prop] = value;
                        action(target);
                    }
                    return Reflect.set(target, prop, value, receiver);
                }
                
            });
        }
    }

/*=================================================================*/

class Bind{
    
        constructor(model, view, ...props){
    
            let proxy = ProxyFactory.create(model, props, model=>{view.update(model)});
            view.update(model);
    
            return proxy;
        }
    }