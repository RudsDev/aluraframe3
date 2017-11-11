'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: '_handleErrors',


        /* res.ok() verifica se houver algum erro na requisição */
        value: function _handleErrors(res) {
            if (!res.ok) throw new Error(res.statusText);
            return res;
        }
    }, {
        key: 'get',
        value: function get(url) {
            var _this = this;

            return fetch(url).then(function (resp) {
                return _this._handleErrors(resp);
            }).then(function (resp) {
                return resp.json();
            }).catch(function (erro) {
                return console.log(erro);
            });
        }
    }, {
        key: 'post',
        value: function post(url, data) {
            var _this2 = this;

            return fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                body: JSON.stringify(data)
            }).then(function (resp) {
                return _this2._handleErrors(resp);
            });
        }
    }]);

    return HttpService;
}();
//# sourceMappingURL=HttpService.js.map