import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Importando Axios configurado
import { Container, Form, Input, TextArea, Select, Button, Page } from './style';

const EditarTarefa = ({ tarefaId, onDeleteSuccess }) => {
  const [tarefa, setTarefa] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Carregar dados da tarefa para edição
    const fetchTarefa = async () => {
      try {
        const response = await api.get(`/tarefa/${tarefaId}`);
        setTarefa(response.data);
      } catch (error) {
        console.error('Erro ao carregar a tarefa:', error);
        alert('Erro ao carregar a tarefa. Por favor, tente novamente.');
      }
    };

    fetchTarefa();
  }, [tarefaId]);

  if (!tarefa) return <p>Carregando...</p>; // Opção de renderizar algo enquanto carrega

  const handleUpdate = async (e) => {
    e.preventDefault();

    const tarefaAtualizada = {
      name: tarefa.name,
      descricao: tarefa.descricao,
      prioridade: tarefa.prioridade,
      membroEmail: tarefa.membroEmail,
    };

    try {
      const response = await api.put(`/tarefa/${tarefaId}`, tarefaAtualizada);

      if (response.status === 200) {
        alert('Tarefa atualizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error);
      let errorMessage = 'Erro ao atualizar a tarefa. Por favor, tente novamente.';

      if (error.response && error.response.status === 400) {
        errorMessage = 'Os dados enviados para o servidor são inválidos. Verifique os campos e tente novamente.';
      } else if (error.response && error.response.status === 500) {
        errorMessage = 'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.';
      } else if (!error.response) {
        errorMessage = 'Problema de conexão com o servidor. Verifique sua internet e tente novamente.';
      }

      alert(errorMessage);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/tarefa/${tarefaId}`);

      if (response.status === 200) {
        alert('Tarefa deletada com sucesso!');
        onDeleteSuccess(); // Atualize a lista ou redirecione após excluir
      }
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);

      let errorMessage = 'Erro ao deletar a tarefa. Por favor, tente novamente.';

      if (error.response && error.response.status === 404) {
        errorMessage = 'Tarefa não encontrada.';
      } else if (!error.response) {
        errorMessage = 'Problema de conexão com o servidor. Verifique sua internet e tente novamente.';
      }

      alert(errorMessage);
    }
  };

  return (
    <Page>
      <Container>
        <h2>Edição de Tarefa</h2>
        <Form onSubmit={handleUpdate}>
          <Input
            type="text"
            placeholder="Nome da Tarefa"
            value={tarefa.name}
            onChange={(e) => setTarefa({ ...tarefa, name: e.target.value })}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          <TextArea
            placeholder="Descrição"
            value={tarefa.descricao}
            onChange={(e) => setTarefa({ ...tarefa, descricao: e.target.value })}
          />
          {errors.descricao && <p style={{ color: 'red' }}>{errors.descricao}</p>}
          <Select
            value={tarefa.prioridade}
            onChange={(e) => setTarefa({ ...tarefa, prioridade: e.target.value })}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </Select>
          <Input
            type="email"
            placeholder="Email do Membro"
            value={tarefa.membroEmail}
            onChange={(e) => setTarefa({ ...tarefa, membroEmail: e.target.value })}
          />
          {errors.membroEmail && <p style={{ color: 'red' }}>{errors.membroEmail}</p>}
          <Button type="submit">Atualizar</Button>
          <Button onClick={handleDelete} style={{ backgroundColor: 'red' }}>
            Deletar
          </Button>
        </Form>
      </Container>
    </Page>
  );
};

export default EditarTarefa;
