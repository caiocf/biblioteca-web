import React, {useState} from 'react';
import PubSub from "pubsub-js";


function InputCustomizado (props) {
    const [msgErro, setMsgErro] = useState("");

    PubSub.subscribe("error-validacao", (topico, erro) => {
            if(erro.field === props.name) {
                setMsgErro( erro.defaultMessage);
            }
    });

    PubSub.subscribe("limpa-erros", (topico) => {
            setMsgErro( '');
    });

    return (
        <div className="pure-control-group">
            <label htmlFor={props.id}>{props.label}</label>
            {/*<input id={props.id} type={props.type} name={props.name}  value={props.value} className={props.className} onChange={props.onChange} />*/}
            <input {...props} />
            <span className="error">{msgErro}</span>
        </div>
    );
};

export default InputCustomizado;
