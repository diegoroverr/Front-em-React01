import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cadastros() {
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [numeroDaReserva, setNumeroDaReserva] = useState('');
  const [quartosDisponiveis, setQuartosDisponiveis] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    obterReservas();
    obterQuartosDisponiveis();
  }, []);

  const obterReservas = () => {
    axios.get('https://localhost:7113/aplicacao/reserva/listar')
      .then(response => {
        setReservas(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter lista de reservas:', error);
      });
  };

  const obterQuartosDisponiveis = () => {
    axios.get('https://localhost:7113/aplicacao/quarto/listar')
      .then(response => {
        const numerosDeQuartos = response.data.map(quarto => quarto.numero);
        setQuartosDisponiveis(numerosDeQuartos);
      })
      .catch(error => {
        console.error('Erro ao obter lista de quartos:', error);
      });
  };

  const handleCadastrar = event => {
    event.preventDefault();

    const novaReserva = {
      quarto: parseInt(numeroDaReserva), // Converter para número inteiro, se necessário
      dataEntrada: dataEntrada,
      dataSaida: dataSaida,
      numeroDaReserva: parseInt(numeroDaReserva) // Converter para número inteiro, se necessário
    };

    axios.post('https://localhost:7113/aplicacao/reserva/cadastrar', novaReserva)
      .then(response => {
        setMensagem('Reserva cadastrada com sucesso!');
        limparCampos();
        obterReservas();
      })
      .catch(error => {
        setMensagem('Erro ao cadastrar reserva: ' + error.message);
      });
  };

  const handleExcluir = id => {
    axios.delete(`https://localhost:7113/aplicacao/reserva/excluir/${id}`)
      .then(response => {
        setMensagem('Reserva excluída com sucesso!');
        obterReservas();
      })
      .catch(error => {
        setMensagem('Erro ao excluir reserva: ' + error.message);
      });
  };

  const limparCampos = () => {
    setDataEntrada('');
    setDataSaida('');
    setNumeroDaReserva('');
  };

  return (
    <div className="pagina-container">
      <h2>Cadastro de Reserva</h2>
      <form onSubmit={handleCadastrar}>
        <div>
          <label htmlFor="dataEntrada">Data de Entrada:</label>
          <input
            type="date"
            id="dataEntrada"
            value={dataEntrada}
            onChange={e => setDataEntrada(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dataSaida">Data de Saída:</label>
          <input
            type="date"
            id="dataSaida"
            value={dataSaida}
            onChange={e => setDataSaida(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="numeroDaReserva">Número do Quarto:</label>
          <select
            id="numeroDaReserva"
            value={numeroDaReserva}
            onChange={e => setNumeroDaReserva(e.target.value)}
            required
          >
            <option value="">Selecione um número de quarto</option>
            {quartosDisponiveis.map(numero => (
              <option key={numero} value={numero}>{numero}</option>
            ))}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <h2>Lista de Reservas</h2>
      <ul>
        {reservas.map(reserva => (
          <li key={reserva.id}>
            <div>
              <strong>Data de Entrada:</strong> {reserva.dataEntrada.slice(0, 10)} {/* Exibe somente a data */}
            </div>
            <div>
              <strong>Data de Saída:</strong> {reserva.dataSaida.slice(0, 10)} {/* Exibe somente a data */}
            </div>
            <div>
              <strong>Número do Quarto:</strong> {reserva.quarto}
            </div>
            <button onClick={() => handleExcluir(reserva.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Cadastros;
