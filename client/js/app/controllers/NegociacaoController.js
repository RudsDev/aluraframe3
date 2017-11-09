class NegociacaoController {

    constructor(){

        let $ = document.querySelector.bind(document);
        let _self = this;

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listagem = new Bind(new ListaNegociacoes(),
                             new NegociacoesView($('#negociacoesView')),
                                    'adiciona', 'esvazia');
      
        this._mensagem = new Bind(new Mensagem(),
                                  new MensagemView($('#mensagemView')),
                                  'texto');

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodas())
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                    this._listagem.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            })

        Object.freeze(this);
    }

    adiciona(event){

        event.preventDefault();

        ConnectionFactory.getConnection()
        .then((connection)=>{

            let negociacao = this._criarNegociacao();

            new NegociacaoDao(connection)
                .adiciona(negociacao)
                .then(()=>{
                    this._mensagem.texto = 'Negociação adicionada com sucesso';
                    this._listagem.adiciona(negociacao);
                    this._limpaFormulario();
                })
                .catch((erro)=>{
                    this._mensagem.texto = erro;
                });
        });     
    }

    esvaziarLista(){

        ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.apagaTodas())
        .then(mensagem =>{
            this._mensagem.texto = mensagem;
            this._listagem.esvaziarLista();
        });
    }

    importarNegociacoes() {
        
    
        let service = new NegociacaoService();
        service
            .obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    this._listagem.negociacoes.indexOf(negociacao)==-1))
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listagem.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro);                              
    }

    _criarNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 0;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}