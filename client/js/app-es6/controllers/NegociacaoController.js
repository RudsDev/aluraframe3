
import {ListaNegociacoes} from "../models/ListaNegociacoes";
import {Mensagem} from "../models/Mensagem";
import {Negociacao} from "../models/Negociacao";
import {NegociacoesView} from "../views/NegociacoesView";
import {MensagemView} from "../views/MensagemView";
import {NegociacaoService} from "../services/NegociacaoService";
import {DateHelper} from "../helpers/DateHelper";
import {Bind} from "../services/Bind";
class NegociacaoController {

    constructor(){

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._service = new NegociacaoService();

        this._listagem = new Bind(new ListaNegociacoes(),
                             new NegociacoesView($('#negociacoesView')),
                                    'adiciona', 'esvazia');
      
        this._mensagem = new Bind(new Mensagem(),
                                  new MensagemView($('#mensagemView')),
                                  'texto');       
        this._init(); 

        Object.freeze(this);

    }
                                
    adiciona(event){
        
        event.preventDefault();

        let negociacao = this._criarNegociacao();

        this._service.cadastrar(negociacao)
            .then(mensagem => {
                this._listagem.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }
    
    esvaziarLista(){

        this._service.apagar()
        .then(mensagem => {
            this._mensagem.texto = mensagem;
            this._listagem.esvaziarLista();
        })
        .catch(erro => this._mensagem.texto = erro);
    }
    
    importarNegociacoes() {
        
        this._service
            .importar(this._listagem.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listagem.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas';   
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
    
    _init(){
        
        this._service.listar()
        .then(negociacoes => 
            negociacoes.forEach(negociacao =>
            this._listagem.adiciona(negociacao))
        )
        .catch(erro => {
            this._mensagem.texto = erro;
        })

        setInterval(()=>{
            console.log('Importando Negociações');
            this.importarNegociacoes();
        },3000);
    }
}