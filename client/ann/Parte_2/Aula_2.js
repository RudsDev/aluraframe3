/* Aula_2 Existe modelo mentiroso? O padrão de projeto Proxy!*/

/*

/## 1 - Modelo e reutilização em projetos ##/
A implementação final da aula anterior, que utilizava o padrão de projeto Observer, que fazia uso
de uma arrow function funciona perfeitamente. Porém, utilizando essa abordagem, coloca-se código
de infra-estrutura(códigos que não tem a ver com o modelo, usados apenas para gerar uma 
funcionalidade no sistema, nesse caso, o código responsável por atualizar as views) dentro do
modelo e isso diminui a possibilidade de reaproveitamento.


/## 2 - O padrão de projeto Proxy ##/
Com a intenção de retirar o código de infra-estrutura da classe de modelo e consequentemente
aumentar a reusabilidade da mesma o código será refatorado e passará a ser utilizado o design
patter Proxy.
Será usado um proxy do tipo Smart Reference que tem por objetivo ser um substituto 
(um pseudo-objeto) que permite executar ações adicionais quando um objeto é acessado.
Esse pseudo-objeto terá todas as operações oferecidas pelo objeto real, e nessas operações do
pseudo-objeto serão adicionadas as ações adicionais desejadas.


/## 3 - Aprendendo a trabalhar com o Proxy ##/
No ES6 há a vantagem de não ter que se implementar um proxy manualmente, pois a própria
especificação fornece uma implementação nativa por meio da classe Proxy.
Sua utilização é simples, cria-se um objeto do tipo desejado usando o construtor
de Proxy.

ex1:
let obj = new Proxy('objeto que se deseja criar', {'funções manipuladoras (antigos triggers)'});

ex2:
let obj = new Proxy(new Objeto(), {handler});

ex3:
//não foram passadas funções manipuladoras (handlers) nesse exemplo
let negociacaoProxy = new Proxy(new Negociacao(new Date(), 1, 100), {});


O objeto negociacaoProxy se comportará exatamente como um instanciado usando new Negociacao().




/## 4 - Construindo armadilhas de leitura ##/
Exemplo de implementação de traps(ou trigger, tanto faz) de operações de leitura [Detalhes
no arquivo ann/Parte_2/index.html].


/## 5 - Construindo armadilhas de escrita ##/
OBS:  Armadilhas serão disparadas mesmo se tentarmos modificar uma propriedade congelada de
 um objeto, ainda que ele não seja modificado.


/## 06 - Método que não altera propriedade ##/
Aplicando o proxy em listasNegociações.



/## 07 - Uma solução para método que não altera propriedade ##/
Para fins didáticos será uma implementada uma gamby para forçar o método adiciona a realizar
uma atribuição e assim realizar automaticamente uma chamada ao set da classe.

OBS: Não há uma maneira de interceptarmos o método com o Proxy.
"Essa limitação ocorre porque sempre que um método de um objeto (que não deixa de ser uma
 propriedade que armazena uma função) é chamado, primeiro é realizado uma operação de leitura
 (get, do nosso handler da proxy) e depois os parâmetros são passados através 
 de Reflect.apply"



/## 08 - Construindo armadilhas para métodos ##/
 Implementação modo "cangaceiro" para interceptar métodos da classe.


/## 09 - Aplicando a solução no NegociacaoController ##/
 Implementação do proxy em NegociacaoController, já com a atualização
 da view dentro do mesmo.

 Será utilizado o artificio do "self", pois o this do proxy fará referência ao mesmo,
 logo mesmo com o uso de arrow function o escopo não seria o de NegociacaoController.

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

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listagem = new ListaNegociacoes();

        this._negociacaoView = new NegociacoesView($('#negociacoesView'));
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._negociacaoView.update(this._listagem);

        Object.freeze(this);
    }


    adiciona(event){

        event.preventDefault();

        this._listagem.adciona(this._criarNegociacao());
        this._limpaFormulario();
        this._negociacaoView. update(this._listagem);
        this._mensagem.texto = "Negociação adcionada com sucesso!"
    }

    esvaziarLista(){

        this._listagem.esvaziarLista();
        this._negociacaoView.update(this._listagem);
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
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

//--------------------------------------------//

class ListaNegociacoes{
    
        constructor(trigger){
            this._trigger = trigger;
            this._negociacoes = [];
        }
    
        adiciona(negociacao){
            /* #7 - gamby para forçar uma atribuição.
            Agora, ao se executar o método adiciona o trigger presente
            no proxy será disparado.*/
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