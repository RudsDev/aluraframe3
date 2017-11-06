class Mensagem{

    /*O EcmaScript-6 permite passar valores padrões para os
    parametros recebidos por uma função. Semelhante ao que
    ocorre no PHP. */
    constructor(texto=''){
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }


}


/*Exatamente o mesmo processo de criação da
 classe NegociacoesView.*/
class MensagemView{

    constructor(element){
        this._element = element;
    }

    _template(texto){
        return `<p class="alert alert-info">${texto}</p>`;
    }

    update(texto){
        this._element.innerHTML = this._template(texto);
    }
}

//=====================================================//

/* ### Herança ### */
/*A herança em EcmaScript-6 funciona de forma
semelhante a linguagens como Java e PHP. 
Utiliza-se a palavra reservada "extends" para sinalizar
que uma classe herda de outra. Além disso
usa-se o método super() em uma classe filha para
invocar o construtor da classe mãe. */


/*Super classe que disponibilizará por meio de 
herança o método _update para suas classes 
filhas. */
class View {

    /*Esse contrutor é chamado através da chamada
    a função super() presente nas classes filhas
    de View.*/
    constructor(element){
        this._element = element;
    }

    /*Esse méthodo está implementado aqui, seguindo o padrão de 
    método privado, somente para lembrar que o método _template()
    devs ser implementado pelas classes filhas de View. Não foi tirada
    a convenção de método privado(_) do _template() pois ao
    meu ver os métodos _template() das classes que herdarem de View
    continuarão sendo privados. */
    _template(){
        throw new Error('O método _template() deve ser implementado!');
    }

    update(model){
        this._element.innerHTML = this._template(texto);
    }
}



class MensagemView_FILHA extends View{

    constructor(element){
        /*Passando o parametro element para
         a classe mãe. */
        super(element);
    }

    _template(texto){
        return `<p class="alert alert-info">${texto}</p>`;
    }
}

class NegociacoesView_FILHA extends View{

    constructor(element){
        /*Passando o parametro element para
         a classe mãe. */
        super(element);
    }

    _template(negociacoes){
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

                ${negociacoes.map(negociacao =>{

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
                ${negociacoes.reduce((total,n) => total + n.obterVolume(),0)}
            </td>
            </tfoot>
        </table>`;
    }
}

/* Ambas classes que herdam de View não tem o método 
update() implementadas mas ambas utilizam o método 
update() da super classe View.*/