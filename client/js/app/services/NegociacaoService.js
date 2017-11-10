class NegociacaoService{
    
    obterNegociacoesDaSemana(callback) {
        
        let xhr = new XMLHttpRequest();
    
        return new Promise((resolve, reject)=>{
            
            xhr.open('GET', 'negociacoes/semana');
        
            xhr.onreadystatechange = () => {
        
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana');
                    }
                }
            };
            xhr.send();
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        
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


    obterNegociacoesDaSemanaRetrasada() {
        
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

    obterNegociacoes() {
        
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    } 
    
    cadastrar(negociacao){

        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(()=> 'Negociação adcionada com sucesso.')
            .catch((error)=> {
                console.log(error);
                throw new Error('Negociação não adicionada.');
            });
    }

}