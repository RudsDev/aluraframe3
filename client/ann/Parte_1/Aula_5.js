/*Essa serviu para exemplificar como modelar uma classe que
cuida da camada de view com principios de POO usando JS-2015.
 */

class NegociacoesView{

    constructor(element){
        this._element = element;
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
                ${
                    //Versão Gamby usando uma função auto invocada
                    /*(function(){
                        let total = 0;
                        negociacoes.forEach(n => total+=n.obterVolume());
                        return total;
                    })()*/

                    //Versão decente
                    /*negociacoes.reduce(function(total,n){
                        return total + n.obterVolume();
                    },0)*/


                    //Versão decente com arrow function
                    negociacoes.reduce((total,n) => total + n.obterVolume(),0)
                };
                </td>
            </tfoot>

        </table>`;
    }


    update(negociacoes){
        this._element.innerHTML = this._template(negociacoes);
    }
}