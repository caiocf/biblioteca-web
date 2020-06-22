import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import InputCustomizado from "./componentes/InputCustomizado";
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

function FormularioLivro(props) {
    const [titulo, setTitulo] = useState("");
    const [preco, setPreco] = useState("0.00");
    const [autorId, setAutorId] = useState("");

    const enviaForm = (evento) => {
        evento.preventDefault();
        $.ajax({
            url: "http://127.0.0.1:8080/api/livros",
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify({titulo: titulo, preco: preco ,autorId: autorId}),
            success: function (novaListagem) {
                console.log("enviado com sucesso");
                PubSub.publish("atualiza-lista-livros",novaListagem);
                setTitulo('');
                setPreco('');
                setAutorId('');
            },
            error: function (resposta) {
                //console.error("Erro salvar autor, status: " + resposta.status + " Message: " +resposta.statusText);
                if(resposta.status === 400){
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros",{}) ;
            }
        });
    }

    return (
        <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={enviaForm} method="POST">
                <InputCustomizado id="titulo" type="text" name="titulo" label="Titulo" value={titulo}
                                  onChange={e => setTitulo(e.target.value)}/>
                <InputCustomizado id="preco" type="number" name="preco" label="Preço" value={preco}
                                  onChange={e => setPreco(e.target.value)}/>
                <div className="pure-control-group">
                    <label htmlFor="autorId">Autor</label>
                    <select value={autorId} name="autorId" id="autorId" onChange={e => setAutorId(e.target.value)}>
                        <option value="" disabled selected>Selecione autor</option>
                        {
                            props.autores.map( autor => (
                                <option value={autor.id}>{autor.nome}</option>
                            ))
                        }
                    </select>
                </div>
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
                    <th>Titulo</th>
                    <th>Preço</th>
                    <th>Autor</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.lista.map( livro => (
                            <tr key={livro.id}>
                                <td>{livro.titulo}</td>
                                <td>{livro.preco}</td>
                                <td>{livro.autor.nome}</td>
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
export default function LivroBox() {

    const [lista, setLista] = useState([]);
    const [autores, setAutores] = useState([]);
    useEffect( () => { fetchLivros(); fetchAutores(); }, []);

    async  function fetchLivros(){
        $.ajax({
            url : "http://127.0.0.1:8080/api/livros",
            type: "GET",
            dataType: "json",
            success: function(resposta)
            {
                setLista(resposta);
            },
            error: function (resposta) {
                console.error("Erro buscar livros, status: " + resposta.status + " Message: " +resposta.statusText);
            }
        });

        PubSub.subscribe("atualiza-lista-livros", (topico, novaListagem) => {
            setLista(novaListagem);
        });
    }

    async  function fetchAutores(){
        $.ajax({
            url : "http://127.0.0.1:8080/api/autores",
            type: "GET",
            dataType: "json",
            success: function(resposta)
            {
                setAutores(resposta);
            },
            error: function (resposta) {
                console.error("Erro buscar autores, status: " + resposta.status + " Message: " +resposta.statusText);
            }
        });
    }


    async  function atualizaListagem(novaLista){
        setLista(novaLista);
    }

    return (
        <div>
            <div className="header">
                <h1>Cadastro de livros</h1>
            </div>
            <div className="content" id="content">
                <FormularioLivro atualizaListagem={atualizaListagem} autores={autores}/>
                <TabelaAutores lista={lista} />
            </div>
        </div>
    );
}
