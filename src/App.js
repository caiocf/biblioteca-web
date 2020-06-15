import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import 'purecss/build/pure-min.css'
import './css/styles.css';
import $ from 'jquery';

function App(props) {
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
                console.log("erro buscar autores");
            }
        });
    }

    const enviaForm = (evento) => {
        evento.preventDefault();
        console.log(nome);
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
                console.log("erro salvar autores");
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
                  <a className="pure-menu-heading" href="#">Company</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>


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
                          <div className="pure-control-group">
                              <label htmlFor="nome">Nome</label>
                              <input id="nome" type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} />
                          </div>
                          <div className="pure-control-group">
                              <label htmlFor="email">Email</label>
                              <input id="email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}   />
                          </div>
                          <div className="pure-control-group">
                              <label htmlFor="senha">Senha</label>
                              <input id="senha" type="password" name="senha" value={senha} onChange={e => setSenha(e.target.value)}/>
                          </div>
                          <div className="pure-control-group">
                              <label></label>
                              <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                          </div>
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
