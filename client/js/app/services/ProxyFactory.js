class ProxyFactory{

    static create(object, props, action){

        return new Proxy(object, {

            get(target, prop, receiver){
                if(props.includes(prop) && ProxyFactory._isFunction(target[prop])){
                    return function () {
                        console.log(`Interceptando ${prop}`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        action(target);
                        return retorno; 
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){

                if(props.includes(prop)){
                    console.log(`SET: Interceptando ${prop}`);
                    let retorno = Reflect.set(target, prop, value, receiver);

                    //só executa action(target) se for uma propriedade monitorada
                    if(props.includes(prop)) action(target);
                    return retorno;
                }
                
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _isFunction(obj){
        return typeof(obj)==typeof(Function)
    }
}