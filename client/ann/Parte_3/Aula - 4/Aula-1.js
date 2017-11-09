/* Aula_1 */



/*/## 1 - Ops! Não podemos importar negociações duplicadas. ##/*/

/* Ao utilizar o indexOf() para evitar que negociações repetidas
fossem importadas foi verificada que essa não é uma solução 
válida. O indexOf() funciona de uma forma diferente do esperado
e acaba por não atender a necessidade do requsito. */

importarNegociacoes() {
    

    let service = new NegociacaoService();
    service
        .obterNegociacoes()
        .then(negociacoes =>
            negociacoes.filter(negociacao =>
                this._listagem.negociacoes.indexOf(negociacao)==-1))
        .then(negociacoes => negociacoes.forEach(negociacao => {
            this._listagem.adiciona(negociacao);
            this._mensagem.texto = 'Negociações do período importadas'   
        }))
        .catch(erro => this._mensagem.texto = erro);                              
}