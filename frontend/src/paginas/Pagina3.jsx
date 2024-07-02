import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pagina3() {
  const [numero, setNumero] = useState('');
  const [quartos, setQuartos] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    obterQuartos();
  }, []);

  const obterQuartos = () => {
    axios.get('https://localhost:7113/aplicacao/quarto/listar')
      .then(response => {
        setQuartos(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter lista de quartos:', error);
      });
  };

  const handleCadastrar = event => {
    event.preventDefault();

    const novoQuarto = {
      numero: numero
    };

    axios.post('https://localhost:7113/aplicacao/quarto/cadastrar', novoQuarto)
      .then(response => {
        setMensagem('Quarto cadastrado com sucesso!');
        limparCampos();
        obterQuartos();
      })
      .catch(error => {
        setMensagem('Erro ao cadastrar quarto: ' + error.message);
      });
  };

  const handleExcluir = id => {
    axios.delete(`https://localhost:7113/aplicacao/quarto/excluir/${id}`)
      .then(response => {
        setMensagem('Quarto excluído com sucesso!');
        obterQuartos(); // Atualiza a lista de quartos após a exclusão
      })
      .catch(error => {
        setMensagem('Erro ao excluir quarto: ' + error.message);
      });
  };

  const limparCampos = () => {
    setNumero('');
  };

  return (
    <div className="pagina-container">
      <h2>Cadastro de Quarto</h2>
      <form onSubmit={handleCadastrar}>
        <div>
          <label htmlFor="numero">Número:</label>
          <input
            type="text"
            id="numero"
            value={numero}
            onChange={e => setNumero(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <h2>Lista de Quartos</h2>
      <ul>
        {quartos.map(quarto => (
          <li key={quarto.id}>
            <div>
              <strong>Número:</strong> {quarto.numero}
            </div>
            <button onClick={() => handleExcluir(quarto.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Pagina3;
