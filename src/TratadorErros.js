import PubSub from 'pubsub-js';

export  default class TratadorErros {

    publicaErros(errors) {
       for(var i=0; i < errors.errors.length; i++){
          var erro = errors.errors[i];
          PubSub.publish("error-validacao", erro);
       }
    }
}
