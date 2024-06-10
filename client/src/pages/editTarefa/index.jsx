import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Importando Axios configurado
import { Container, Form, Input, TextArea, Select, Button, Page } from './style';

const UpdateTarefa = () => {
  const [name, setName] = useState('');
  const [descricao, setDescricao] = useState('');
  const [finalizada, setFinalizada] = useState(false);
  const [dataTerminoStr, setDataTerminoStr] = useState('');
  const [prioridade, setPrioridade] = useState('baixa');
  const [membroEmail, setMembroEmail] = useState('');
  const [tarefaData, setTarefaData] = useState(null);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' ou 'error'

  useEffect(() => {
    if (tarefaData) {
      setName(tarefaData.name);
      setDescricao(tarefaData.descricao);
      setFinalizada(tarefaData.finalizada);
      setDataTerminoStr(tarefaData.data_termino || '');
      setPrioridade(tarefaData.prioridade);
    }
  }, [tarefaData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos obrigatórios
    if (!name || !descricao || !membroEmail || !prioridade) {
      setErrors({ geral: 'Todos os campos obrigatórios devem ser preenchidos' });
      return;
    }

    const dataTermino = dataTerminoStr ? dataTerminoStr.replace(/[^0-9]/g, '') : undefined;
    const formattedDataTermino = dataTermino
      ? `${dataTermino.slice(0, 4)}-${dataTermino.slice(4, 6)}-${dataTermino.slice(6)}`
      : undefined;

    const tarefaAtualizada = {
      name,
      descricao,
      finalizada,
      data_termino: formattedDataTermino,
      prioridade,
      membroEmail,
    };

    try {
      const response = await api.patch(`/tarefa/${membroEmail}`, tarefaAtualizada);

      if (response.status === 200) {
        setAlertMessage('Tarefa atualizada com sucesso!');
        setAlertType('success');
        setName('');
        setDescricao('');
        setFinalizada(false);
        setDataTerminoStr('');
        setPrioridade('baixa');
        setMembroEmail('');
        setErrors({});
        setError('');
      }
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error);

      let errorMessage = 'Erro ao atualizar a tarefa. Por favor, tente novamente.';

      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.message.includes('Nome já existe')) {
            errorMessage = 'Uma tarefa com este nome já existe';
          } else if (error.response.data.message.includes('Data de término é obrigatória para tarefas finalizadas')) {
            errorMessage = 'Data de término é obrigatória para tarefas finalizadas';
          } else if (error.response.data.message.includes('Membro não cadastrado no sistema')) {
            errorMessage = 'Membro não cadastrado no sistema';
          } else {
            errorMessage = 'Erro ao atualizar tarefa, tente novamente mais tarde';
          }
        } else if (error.response.status === 404) {
          errorMessage = 'Membro não encontrado. Tente Novamente.';
        } else if (error.response.status === 403) {
          errorMessage = 'Tarefas finalizadas não podem ser editadas';
        }
      } else if (!error.response) {
        errorMessage = 'Problema de conexão com o servidor. Verifique sua internet e tente novamente.';
      }

      setError(errorMessage);
      setAlertMessage(errorMessage);
      setAlertType('error');

      // Reseta após 5 segundos
      setTimeout(() => {
        setAlertMessage('');
      }, 5000);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/tarefa/${membroEmail}`);

      if (response.status === 200) {
        setAlertMessage('Tarefa deletada com sucesso!');
        setAlertType('success');
        setName('');
        setDescricao('');
        setFinalizada(false);
        setDataTerminoStr('');
        setPrioridade('baixa');
        setMembroEmail('');
        setErrors({});
        setError('');
      }
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);

      let errorMessage = 'Erro ao deletar a tarefa. Por favor, tente novamente.';

      if (error.response && error.response.status === 404) {
        errorMessage = 'Membro não encontrado. Tente Novamente.';
      } else if (!error.response) {
        errorMessage = 'Problema de conexão com o servidor. Verifique sua internet e tente novamente.';
      }

      setError(errorMessage);
      setAlertMessage(errorMessage);
      setAlertType('error');

      // Reseta após 5 segundos
      setTimeout(() => {
        setAlertMessage('');
      }, 5000);
    }
  };

  return (
    <Page>
      <Container>
        <h2>Edição de Tarefa</h2>
        {alertMessage && (
          <p style={{ color: alertType === 'error' ? 'red' : 'green' }}>{alertMessage}</p>
        )}
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome da Tarefa"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          <TextArea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          {errors.descricao && <p style={{ color: 'red' }}>{errors.descricao}</p>}
          <Select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </Select>
          <Input
            type="email"
            placeholder="Email do Membro"
            value={membroEmail}
            onChange={(e) => setMembroEmail(e.target.value)}
          />
          {errors.membroEmail && <p style={{ color: 'red' }}>{errors.membroEmail}</p>}
          <Input
            type="date"
            placeholder="Data de Término"
            value={dataTerminoStr}
            onChange={(e) => setDataTerminoStr(e.target.value)}
          />
          {errors.data_termino && <p style={{ color: 'red' }}>{errors.data_termino}</p>}
          <div>
            <input
              type="checkbox"
              checked={finalizada}
              onChange={(e) => setFinalizada(e.target.checked)}
            />
            <label>Finalizada</label>
          </div>
          {errors.finalizada && <p style={{ color: 'red' }}>{errors.finalizada}</p>}
          <Button type="submit">Atualizar</Button>
          <Button type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
            Deletar
          </Button>
        </Form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Container>
    </Page>
  );
};

export default UpdateTarefa;
