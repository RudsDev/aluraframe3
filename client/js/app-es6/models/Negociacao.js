export class Negociacao{
 
    constructor(data, quantidade, valor){

        this._quantidade = quantidade;
        this._valor = valor;
        this._data = new Date(data.getTime());

        Object.freeze(this);
    }

    obterVolume(){
        return this._quantidade * this._valor;
    }

    get data(){
        return new Date(this._data.getTime());
    }
    get quantidade(){
        return this._quantidade;
    }
    get valor(){
        return this._valor;
    }
}