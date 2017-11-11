'use strict';

System.register(['./controllers/NegociacaoController', '/js/app/polyfill/fetch'], function (_export, _context) {
    "use strict";

    var NegociacaoController, negociacaoController;
    return {
        setters: [function (_controllersNegociacaoController) {
            NegociacaoController = _controllersNegociacaoController.NegociacaoController;
        }, function (_jsAppPolyfillFetch) {}],
        execute: function () {
            negociacaoController = new NegociacaoController();


            /*Retirando a reponsabilidade de ligação dos btns coms os métodos
            apagar e adicionar da View e delegando para o boot.js*/
            document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
            document.querySelector('[type=button]').onclick = negociacaoController.esvaziarLista.bind(negociacaoController);
        }
    };
});
//# sourceMappingURL=boot.js.map