'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                request.onsuccess = function (event) {
                    console.log('Negociação incluida com sucesso.');
                    resolve();
                };

                request.onerror = function (event) {
                    console.log('Negociação não incluída.');
                    console.log(event.target.error);
                };
            });
        }
    }, {
        key: 'listaTodas',
        value: function listaTodas() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                var negociacoes = [];

                cursor.onsuccess = function (event) {

                    var atual = event.target.result;

                    if (atual) {
                        var dado = atual.value;
                        negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                        atual.continue();
                    } else {
                        resolve(negociacoes);
                    }
                };

                cursor.onerror = function (event) {
                    console.log(event.target.error.name);
                    reject('Não foi possivel listar as negociações.');
                };
            });
        }
    }, {
        key: 'apagaTodas',
        value: function apagaTodas() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                request.onsuccess = function (event) {
                    resolve('Negociações removidas com sucesso');
                };

                request.onerror = function (event) {
                    console.log(event.target.error);
                    reject('Não foi possivel apagar as negociações.');
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map