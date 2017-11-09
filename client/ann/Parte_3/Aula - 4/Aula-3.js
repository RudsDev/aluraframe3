/* Aula_3 */



/*/## 3 - Usando o método some ##/*/

/*

No video anterior foi utilizado o artificio de
parsear os dois objetos a serem comparados em
string para que a comparação seja feita de forma
correta. O método filter() precisa receber um 
boolean para determinar ao final se determinada
negociação será incluída ou não na listagem.
Para tal será utilizado o método some().


"A função some() vai varrer cada item da lista
verificando se os elementos são iguais ao critério
estabelecido. Enquanto o item for diferente, ele 
seguirá para o próximo. Quando o elemento for 
equivalente ao critério, letras retornará true e 
não seguirá iterando no array até o fim. 
Basta encontrar um item que seja correspondente ao 
critério para que o retorno de some() seja true." */

importarNegociacoes() {
    

    let service = new NegociacaoService();
    service
        .obterNegociacoes()
        .then(negociacoes =>
            negociacoes.filter(negociacao =>

                this._listagem.negociacoes.some(negociacaoInList =>
                //convertendo em string e comparando os objetos
                JSON.stringify(negociacao)==JSON.stringify(negociacaoInList)
            ))
        )
        .then(negociacoes => negociacoes.forEach(negociacao => {
            this._listagem.adiciona(negociacao);
            this._mensagem.texto = 'Negociações do período importadas';   
        }))
        .catch(erro => this._mensagem.texto = erro);                              
}