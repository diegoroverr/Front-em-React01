import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pagina2() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [hospedes, setHospedes] = useState([]);

  useEffect(() => {
    obterHospedes();
  }, []);

  const obterHospedes = () => {
    axios.get('https://localhost:7113/aplicacao/hospede/listar')
      .then(response => {
        setHospedes(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter lista de hóspedes:', error);
      });
  };

  const handleCadastrar = event => {
    event.preventDefault();

    const novoHospede = {
      nome: nome,
      email: email
    };

    axios.post('https://localhost:7113/aplicacao/hospede/cadastrar', novoHospede)
      .then(response => {
        setMensagem('Hóspede cadastrado com sucesso!');
        limparCampos();
        obterHospedes();
      })
      .catch(error => {
        setMensagem('Erro ao cadastrar hóspede: ' + error.message);
      });
  };

  const handleExcluir = id => {
    axios.delete(`https://localhost:7113/aplicacao/hospede/excluir/${id}`)
      .then(response => {
        setMensagem('Hóspede excluído com sucesso!');
        obterHospedes();
      })
      .catch(error => {
        setMensagem('Erro ao excluir hóspede: ' + error.message);
      });
  };

  const limparCampos = () => {
    setNome('');
    setEmail('');
    setId('');
  };

  return (
    <div className="pagina-container">
      <h2>Cadastro de Hóspede</h2>
      <form onSubmit={handleCadastrar}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <h2>Lista de Hóspedes</h2>
      <ul>
        {hospedes.map(hospede => (
          <li key={hospede.id}>
            <div>
              <strong>Nome:</strong> {hospede.nome}
            </div>
            <div>
              <strong>Email:</strong> {hospede.email}
            </div>
            <button onClick={() => handleExcluir(hospede.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Pagina2;
