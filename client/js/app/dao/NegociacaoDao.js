class NegociacaoDao{

    constructor(connection){

        this._connection = connection;
        this._store = 'negociacoes';

    }

    adiciona(negociacao){

        return new Promise((resolve, reject)=>{

           let request = this._connection
            .transaction([this._store],'readwrite')
            .objectStore(this._store)
            .add(negociacao);

            request.onsuccess = (event)=>{
                console.log('Negociação incluida com sucesso.');
                resolve();
            };

            request.onerror = (event)=>{
                console.log('Negociação não incluída.');
                console.log(event.target.error);
            };

        });
    }

    listaTodas() {
        
        return new Promise((resolve, reject) => {
            
            let cursor = this._connection
            .transaction([this._store],'readwrite')
            .objectStore(this._store)
            .openCursor();





            let negociacoes = [];

            cursor.onsuccess = (event)=>{

                let atual = event.target.result;

                if(atual){
                    
                    let dado = atual.value;
    
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
    
                    atual.continue();
                }else{
                    resolve(negociacoes);
                }

            };

            cursor.onerror = (event)=>{
                console.log(event.target.error.name);
                reject('Não foi possivel listar as negociações.');
            };


        });
    }

}