'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFactory = function tempConnectionFactory() {

    var stores = ['negociacoes'];
    var version = 3;
    var dbName = 'aluraframe';

    var connection = null;
    var close = null;

    return function () {
        function ConnectionFactory() {
            _classCallCheck(this, ConnectionFactory);

            throw new Error('Não é possível criar instâncias dessa classe.');
        }

        _createClass(ConnectionFactory, null, [{
            key: 'getConnection',
            value: function getConnection() {

                return new Promise(function (resolve, reject) {

                    var openRequest = window.indexedDB.open(stores, version);

                    openRequest.onupgradeneeded = function (event) {
                        ConnectionFactory._createStore(event.target.result);
                    };

                    openRequest.onsuccess = function (event) {

                        if (!connection) {
                            connection = event.target.result;
                            close = connection.close.bind(connection);
                            connection.close = function () {
                                throw new Error('Essa conexão não pode ser fechada diretamente.');
                            };
                        }
                        resolve(connection);
                    };

                    openRequest.onerror = function (event) {
                        console.log(event.target.error);
                        reject(event.target.error.name);
                    };
                });
            }
        }, {
            key: 'closeConnection',
            value: function closeConnection() {
                if (connection) {
                    close();
                    connection = null;
                }
            }
        }, {
            key: '_createStore',
            value: function _createStore(conn) {
                stores.forEach(function (store) {
                    if (conn.objectStoreNames.contains(store)) conn.deleteObjectStore(store);
                    conn.createObjectStore(store, { autoIncrement: true });
                });
            }
        }]);

        return ConnectionFactory;
    }();
}();
//# sourceMappingURL=ConnectionFactory.js.map