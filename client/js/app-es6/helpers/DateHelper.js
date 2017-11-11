export class DateHelper {

    constructor(){
        throw new Error('Não há necessidade de instanciar'
         + ' um objeto do tipo DateHelper.');
    }

    static textoParaData(texto) {
        return new Date(...texto.split('-')
            .map((item, index) => item - index % 2));

    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
}