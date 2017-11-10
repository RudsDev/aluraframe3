class HttpService {

    /* res.ok() verifica se houver algum erro na requisição */
    _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url){
       return fetch(url)
            .then(resp => this._handleErrors(resp))
            .then(resp => resp.json())
            .catch(erro => console.log(erro));

    }
}