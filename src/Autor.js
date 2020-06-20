import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import InputCustomizado from "./componentes/InputCustomizado";
import PubSub from 'pubsub-js';

function FormularioAutor() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const enviaForm = (evento) => {
        evento.preventDefault();
        $.ajax({
            url: "http://127.0.0.1:8080/api/autores",
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify({nome: nome, email: email ,senha: senha}),
            success: function (novaListagem) {
                console.log("enviado com sucesso");
                PubSub.publish("atualiza-lista-autores",novaListagem);
            },
            error: function (resposta) {
                console.error("Erro salvar autor, status: " + resposta.status + " Message: " +resposta.statusText);
            }
        });
    }

    return (
        <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={enviaForm} method="POST">
                <InputCustomizado id="nome" type="text" name="nome" label="Nome" value={nome}
                                  onChange={e => setNome(e.target.value)}/>
                <InputCustomizado id="email" type="text" name="email" label="Email" value={email}
                                  onChange={e => setEmail(e.target.value)}/>
                <InputCustomizado id="senha" type="password" name="senha" label="Senha" value={senha}
                                  onChange={e => setSenha(e.target.value)}/>
                <InputCustomizado id="gravar" type="submit" name="gravar" value="Gravar"
                                  className="pure-button pure-button-primary"/>
            </form>
        </div>
    );
}

function TabelaAutores(props) {

    return (
        <div>
            <table className="pure-table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>email</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.lista.map( autor => (
                            <tr key={autor.id}>
                                <td>{autor.nome}</td>
                                <td>{autor.email}</td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
    );

}

// HIGH ORDER COMPONENT
export default function AutorBox() {

    const [lista, setLista] = useState([]);
    useEffect( () => { fetchAutores() }, []);

    async  function fetchAutores(){
        $.ajax({
            url : "http://127.0.0.1:8080/api/autores",
            type: "GET",
            dataType: "json",
            success: function(resposta)
            {
                setLista(resposta);
            },
            error: function (resposta) {
                console.error("Erro buscar autores, status: " + resposta.status + " Message: " +resposta.statusText);
            }
        });

        PubSub.subscribe("atualiza-lista-autores", (topico, novaListagem) => {
            setLista(novaListagem);
        });
    }


    async  function atualizaListagem(novaLista){
        setLista(novaLista);
    }

    return (
        <div className="content" id="content">
            <FormularioAutor atualizaListagem={atualizaListagem}/>
            <TabelaAutores lista={lista}/>
        </div>
    );
}
