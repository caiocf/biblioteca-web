import React from 'react';

function InputCustomizado (props) {
    return (
        <div className="pure-control-group">
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type={props.type} name={props.name}  value={props.value} className={props.className} onChange={props.onChange} />
        </div>
    );
};

export default InputCustomizado;
