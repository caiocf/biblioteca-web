import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import 'purecss/build/pure-min.css'
import './css/styles.css';
import $ from 'jquery';
import InputCustomizado from "./componentes/InputCustomizado";

function App() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

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
    }

    const enviaForm = (evento) => {
        evento.preventDefault();
        $.ajax({
            url: "http://127.0.0.1:8080/api/autores",
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify({nome: nome, email: email ,senha: senha}),
            success: function (resposta) {
                console.log("enviado com sucesso");
                setLista(resposta);
            },
            error: function (resposta) {
                console.error("Erro salvar autor, status: " + resposta.status + " Message: " +resposta.statusText);
            }
        });
    }

    return (
      <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
              <span></span>
          </a>

          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="# ">Company</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="# " className="pure-menu-link">Home</a></li>
                      <li className="pure-menu-item"><a href="# " className="pure-menu-link">Autor</a></li>
                      <li className="pure-menu-item"><a href="# " className="pure-menu-link">Livros</a></li>
                  </ul>
              </div>
          </div>

          <div id="main">
              <div className="header">
                  <h1>Cadastro de Autores</h1>
              </div>
              <div className="content" id="content">
                  <div className="pure-form pure-form-aligned">
                      <form className="pure-form pure-form-aligned" onSubmit={enviaForm} method="POST">

                          <InputCustomizado id="nome" type="text" name="nome"  label="Nome" value={nome} onChange={ e => setNome(e.target.value)} />
                          <InputCustomizado id="email" type="text" name="email"  label="Email" value={email} onChange={ e => setEmail(e.target.value)}/>
                          <InputCustomizado id="senha" type="password" name="senha"  label="Senha" value={senha} onChange={ e => setSenha(e.target.value)}/>
                          <InputCustomizado id="gravar" type="submit" name="gravar" value="Gravar" className="pure-button pure-button-primary" />
                      </form>

                  </div>
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
                              lista.map( autor => (
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
              </div>
          </div>
      </div>
);
}

export default App;
