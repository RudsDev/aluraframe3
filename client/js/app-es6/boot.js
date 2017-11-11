import {currentInstance} from './controllers/NegociacaoController';
import {} from '/js/app/polyfill/fetch';

let negociacaoController = currentInstance();

/*Retirando a reponsabilidade de ligação dos btns coms os métodos
apagar e adicionar da View e delegando para o boot.js*/
document.querySelector('.form').onsubmit = 
    negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = 
    negociacaoController.esvaziarLista.bind(negociacaoController);