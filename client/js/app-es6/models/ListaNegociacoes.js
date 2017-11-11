class ListaNegociacoes{

    constructor(trigger){
        this._trigger = trigger;
        this._negociacoes = [];
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
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

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }

}