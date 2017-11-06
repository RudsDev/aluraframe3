//Exemplo de classe em EcmaScript 6

/*É uma boa prática o arquivo e a classe presente nesse arquivo
 terem o mesmo nome.
 Nome esse que por padrão deve iniciar com letra maiuscula.*/ 

 /*
> OBS[0]: ES6 não suporta overload de construtores.
 */

class Negociacao{

    /*Os atributos de uma classe em ES6 são sempre definidos 
    dentro do construtor.*/
    
    /*constructor(){
        this.data = new Date();
        this.quantidade = 1;
        this.valor = 0.0;
    }*/    
    constructor(data, quantidade, valor){
        
        /*O ES6 não suporta o uso de modificadores de acesso.
        Devido a essa limitação usa-se a convenção de iniciar
        com '_' (underline ou underscore) os nomes dos 
        atributos que só devem ser acessados por métodos
        pertencentes a própria classe.  
        */
        this._quantidade = quantidade;
        this._valor = valor;

        /** ### Programação Defensiva ### **/
        /* Para evitar que a referência externa passada como
        parâmetro tenha seu valor alterado e consequentemente
        o valor do atributo _data também o seja (que bizarro...),
        armazenados no atributo _data um novo objeto gerado a 
        partir da referência recebida no construtor. */
        this._data = new Date(data.getTime());

        /* Congelando o objeto. Fazendo isso não se pode mais
         alterar os valores dos atributos do objeto. Todavia, 
         o acesso a esses valores ainda é permitido. ou seja,
         ainda é possível visualizar o valor de uma propriedade.
         Outra caracteristica do freeze() é de que ele oferece
         uma imutabilidade rasa que é ineficiente em atributos
         que não sejam de tipos primitivos. Caso um atributo
         seja um objeto o freeze não afetará as propriedades
         desse atributo. Por exemplo, o atributo data pode
         ter seu valor facilmente alterado utilizando o seu
         respectivo get: this.data.setDate(11). Isso alterará 
         o dia da data em questão para o dia 11. */
        Object.freeze(this);

    }

    //Estrutura de um método em ES6
    obterVolume(){
        return this._quantidade * this._valor;
    }


    //gets e sets


    /** ### Programação Defensiva ### **/
    /* Para proteger o atributo data de alterações externas
    utlizamos o conceito de programação defensiva.
    Nesse caso, ao invés de retornar uma referência direta
    ao atributo _data da classe retornaremos um novo objeto
    baseado no valor do atributo em questão.
    Fazendo isso, ao utilizar o get de _data, sempre que
    se tentar alterar o valor do atributo através de seu
    get o valor alterado será o de uma "cópia" do atributo.
    O atributo original continuará com seu valor inicial. */
    getData(){
        //return this._data;
        return new Date(this._data.getTime());
    }
    getQuantidade(){
        return this._quantidade;
    }
    getValor(){
        return this._valor;
    }


    /*Em ES6 Existe a possibilidade de utilizar o atalho 'get' 
    quando se dejesa acessar uma propriedade. Utilizando o 'get'
    antes de uma função acessamos tal função através de um objeto
    como se a mesma fosse uma propriedade daquele objeto.
    Ex: negociacao.data; 
    Como na verdade estamos acessando um método, uma vangatem 
    dessa abordagem é que aotentar atribuir um valor a um
    atributo usando "negociacao.quantidade = 777" nenhuma 
    alteração será feita, pois o método usado para acessar
    o atributo _quantidade (get quantidade()) não aceita
    atribuições.
    */

    get data(){
        return new Date(this._data.getTime());
    }
    get quantidade(){
        return this._quantidade;
    }
    get valor(){
        return this._valor;
    }



    /* ### Escopo: var e let ### */
    loopFor(){

        /*Em JS não existe escopo de bloco. Declarar uma variavel
        dentro de um bloco não garantirá que a mesma não poderá
        ser acessada fora daquele bloco! */
        for(var index = 0; index <= 5; index++) {
            var testeVar = "Testando escopo var";
            console.log(index);
        }

        /*É possível acessar as variaveis definidas dentro do escopo
        do for.*/
        console.log("Index fora do for: " + index);
        console.log(testeVar);


        /*Para definir uma variavel que exista somente dentro de
        um determinado escopo ao invés de usar "var" para declarar
        a variavel usamos "let".  */
        for(let cont = 0; cont <= 5; cont++) {
            let testeLet = "Testando escopo let";
            console.log(cont);
        }

        /*Não é possível acessar as variaveis definidas dentro do 
        escopo do for.*/
        console.log(cont); //causará uma erro
        console.log(testeLet); //causará uma erro

        /*É interessante o hábito de utilizar o let para evitar
        que variaveis sejam acessíveis fora do escopo do qual 
        fazem parte. */

    }
}