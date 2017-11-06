/* Aula_5 */

/*

/## 1 - O problema da vida assíncrona ##/

Nessa aula são mostradas alguns problemas que surgem
ao se trabalhar de forma assíncronas.*/

/* #1 - Adcionando operações para recuperar dados de
 negociações de outras semanas de forma aninhada.
*/
NegociacaoController.importarNegociacoes(){


    /* #1  - Dois problemas gerados por essa abordagem são:
        > Pyramid of Doom - Indica que há problemas de legibilidade 
        (e possivelmente de lógica) no código.
        
        > Callback Hell - Chamadas aninhadas de callbacks. 
        Isso não pode ser bom. Em nenhum aspecto.

        Para resolvermos esse problema usaremos o padrão de projetos Promise.

        */
    
    let negociacaoService = new NegociacaoService();

    negociacaoService.obterNegociacoesDaSemana((erro, negociacoes)=>{
        if(erro) {
            this._mensagem.texto = erro;
            return;
        }
        negociacoes.forEach(negociacao => this._listagem.adiciona(negociacao));
       
        negociacaoService.obterNegociacoesDaSemanaAnterior((erro, negociacoes)=>{
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }
            negociacoes.forEach(negociacao => this._listagem.adiciona(negociacao));

            negociacaoService.obterNegociacoesDaSemanaRetrasada((erro, negociacoes)=>{
                if(erro) {
                    this._mensagem.texto = erro;
                    return;
                }
                negociacoes.forEach(negociacao => this._listagem.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso';
            });  
        });
    });       
}
//=========================================================//





/*
/## 2 - O padrão de projeto Promise ##/

    Para resolver alguns dos problemas gerados 
    pelo uso de chamadas assíncronas no código,
    será utiliado o padrão de projeto Promise,
    que em ES6 já vem na biblioteca padrão 
    da especificação.

*/
NegociacaoController.importarNegociacoes(){
    
    
    /* #2  - Adaptando o método para trabalhar com Promises.*/
    
    let negociacaoService = new NegociacaoService();

    //Será recebido um objeto do tipo Promise.
    let promise = negociacaoService.obterNegociacoesDaSemana();

    /*Caso a promesa seja "cumprida" sem problemas o then()
    será executado e a lista de negociações será recebida 
    normalmente (no parametro da arrow function) e a
    function passada como parametro para o método then() 
    será executada.*/
    promise.then((negociacoes)=>{
        negociacoes.forEach(negociacao => this._listagem.adiciona(negociacao));
        this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
    })
    // Caso ocorra algum problema, será executado o catch().
    .catch((erro)=>{this._mensagem.texto = erro})


}

/* ----------------------------------------------------- */

NegociacaoService.obterNegociacoesDaSemana() {
    
    let xhr = new XMLHttpRequest();

    /* O construtor de uma Promise recebe dois 
    parâmetros, a saber, resolve e reject. 
    O resolve é uma função que será chamada
    em caso de sucesso na execução da promisse.
    O reject é uma função que será chamda em caso
    de falha na execução da promise.
    Ambas recebem uma função como parâmetro. 
    Essa funcção que será executada quando 
    o resolve ou o reject forem chamados.*/
    return new Promise((resolve, reject)=>{
        
        xhr.open('GET', 'negociacoes/semana');
    
        xhr.onreadystatechange = () => {
    
            if(xhr.readyState == 4) {
    
                //Execução bem-sucedida. Invocará resolve()
                if(xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
    
                } 
                //Execução falhou. Invocará reject()
                else {
                    console.log(xhr.responseText);
                    reject('Não foi possível obter as negociações da semana');
                }
            }
        };

        xhr.send();

    });
}

NegociacaoService.obterNegociacoesDaSemanaAnterior() {
    
    let xhr = new XMLHttpRequest();

    return new Promise((resolve, reject)=>{
        
        xhr.open('GET', 'negociacoes/anterior');
    
        xhr.onreadystatechange = () => {
    
            if(xhr.readyState == 4) {

                if(xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
    
                } else {
                    console.log(xhr.responseText);
                    reject('Não foi possível obter as negociações da semana anterior.');
                }
            }
        };
        xhr.send();
    });
}

NegociacaoService.obterNegociacoesDaSemanaRetrasada() {
    
    let xhr = new XMLHttpRequest();

    return new Promise((resolve, reject)=>{
        
        xhr.open('GET', 'negociacoes/retrasada');
    
        xhr.onreadystatechange = () => {
    
            if(xhr.readyState == 4) {
    
                if(xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
    
                } else {
                    console.log(xhr.responseText);
                    reject('Não foi possível obter as negociações da semana retrasada.');
                }
            }
        };
        xhr.send();
    });
}


/* #2 

    Apesar do uso do padrão Promises ter melhorado
    a qualidade do código, caímos no mesmo erro 
    que ocorria quando estavamos com o problema
    de Pyramid of Doom e Callback Hell. As chamadas
    assíncronas retornam os dados fora da ordem
    desejada.

*/



//=========================================================//





/*
/## 3 - Pyramid of Doom novamente? Claro que não, Promise.all nela! ##/


*/

//=========================================================//





/*
/## 4 -  ##/


*/

//=========================================================//





/*
/## 5 -  ##/


*/

//=========================================================//