'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._service = new NegociacaoService();

        this._listagem = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        this._init();

        Object.freeze(this);
    }

    _createClass(NegociacaoController, [{
        key: 'adiciona',
        value: function adiciona(event) {
            var _this = this;

            event.preventDefault();

            var negociacao = this._criarNegociacao();

            this._service.cadastrar(negociacao).then(function (mensagem) {
                _this._listagem.adiciona(negociacao);
                _this._mensagem.texto = mensagem;
                _this._limpaFormulario();
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });
        }
    }, {
        key: 'esvaziarLista',
        value: function esvaziarLista() {
            var _this2 = this;

            this._service.apagar().then(function (mensagem) {
                _this2._mensagem.texto = mensagem;
                _this2._listagem.esvaziarLista();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: 'importarNegociacoes',
        value: function importarNegociacoes() {
            var _this3 = this;

            this._service.importar(this._listagem.negociacoes).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this3._listagem.adiciona(negociacao);
                    _this3._mensagem.texto = 'Negociações do período importadas';
                });
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: '_criarNegociacao',
        value: function _criarNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 0;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }, {
        key: '_init',
        value: function _init() {
            var _this4 = this;

            this._service.listar().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this4._listagem.adiciona(negociacao);
                });
            }).catch(function (erro) {
                _this4._mensagem.texto = erro;
            });

            setInterval(function () {
                console.log('Importando Negociações');
                _this4.importarNegociacoes();
            }, 3000);
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map