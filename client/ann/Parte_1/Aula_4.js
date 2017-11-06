class DateHelper {

    /*textoParaData(texto) {
        return new Date(...texto.split('-')
            .map((item, index) => item - index % 2));
    }

    dataParaTexto(data) {
        return data.getDate()
        + '/' + (data.getMonth() + 1)
        + '/' + data.getFullYear();
    }*/


    /*Como DateHelper é uma classe que terá apenas
    métodos estaticos não faz sentido instancia-la.
    É uma boa prática lancar um erro/exception 
    avisando que essa clase não deve ser instanciada.
    Para isso usamos um throw em seu construtor. */
    constructor(){
        throw new Error('Não há necessidade de instanciar'
         + ' um objeto do tipo DateHelper.');
    }


    /*O JS 6 suporta métodos definidos como static.*/
    static textoParaData(texto) {
        return new Date(...texto.split('-')
            .map((item, index) => item - index % 2));

    }

    static dataParaTextoConcatenandoString(data) {
        return data.getDate()
        + '/' + (data.getMonth() + 1)
        + '/' + data.getFullYear();
    }


    /* ### Template Strings ### */
    /*O JS-2015 traz um novo recurso chamado template Strings. Esse recurso
    facilita a concatenação de strings interpolando nas mesmas as variaveis
    desejadas. Para utiliza-la usa-se a crase(`) ao invés das habituais
    aspas simples e ${nome_variavel} para fazer a interpolação.
    ex:

    let cor = 'azul';

    console.log(`Eu tenho um carro ${cor}`);*/
    
    //Usando Template Strings
    static dataParaTexto(data) {

        if(!/\d{4}-\d{2}-\d{2}/.test(data))
            throw new Error('A data deve estar no formato yyyy-mm-dd');

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

}



class ListaNegociacoes{

    constructor(){

        this._negociacoes = [];
    }

    adciona(negociacao){
        this._negociacoes.push(negociacao);
    }


    get negociacoes(){
        /*Programação defensiva.
        Para evitar que seja possivel alterar as propriedades do array
        original é retornado uma cópia desse array. */
        return [].concat(this._negociacoes);
    }

}