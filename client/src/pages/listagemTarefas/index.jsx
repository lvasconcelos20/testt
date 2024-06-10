import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Container, Form, Input, TaskList, TaskItem, Page, Loading, NoResults, TaskDetails, EditButton, DeleteButton, Button } from './style';
import { useRouter } from 'next/router';

const ListTarefas = () => {
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Estado para armazenar a tarefa selecionada
  const [editMode, setEditMode] = useState(false); // Estado para controle do modo de edição

  const router = useRouter();

  useEffect(() => {
    if (email) {
      listarTarefas(); // Executa a busca assim que o email mudar
    }
  }, [email]);

  const listarTarefas = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(`/tarefa/${email}`);
      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setTasks(response.data);
        setNoResults(false);
      }
    } catch (error) {
      console.error('Erro ao listar tarefas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleNextEdit = () => {
    router.push('../editTarefa');
  };
 
  const handleNextCadastro = () => {
    router.push('../cadastroTarefas');
  };

  const handleDeleteButtonClick = async (taskId) => {
    try {
      await api.delete(`/tarefa/${taskId}`);
      // Remove a tarefa do estado após exclusão bem-sucedida
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleUpdateFinalizada = async (taskId, finalizada) => {
    try {
      await api.patch(`/tarefa/${taskId}`, { finalizada });
      // Atualiza o estado das tarefas após a atualização bem-sucedida
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, finalizada } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  return (
    <Page>
      <Container>
        <h1>Lista de Tarefas</h1>
        <Form>
          <Input
            type="text"
            placeholder="Digite o email do membro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form>
        {isLoading ? (
          <Loading>Carregando...</Loading>
        ) : noResults ? (
          <NoResults>Nenhuma tarefa encontrada.</NoResults>
        ) : (
          <>
            <TaskList>
              {tasks.map((tarefa, index) => (
                <TaskItem
                  key={index}
                  onClick={() => handleTaskClick(tarefa)}
                  className={selectedTask?.id === tarefa.id ? 'selected' : ''}
                >
                  Nome: {tarefa.name}, Prioridade: {tarefa.prioridade}, Finalizada: {tarefa.finalizada ? 'Sim' : 'Não'}
                  {selectedTask?.id === tarefa.id && (
                    <TaskDetails>
                      <h3>Descrição:</h3>
                      <p>{tarefa.descricao}</p>
                      <div>
                        <label>
                          Finalizada:
                          <input
                            type="checkbox"
                            checked={tarefa.finalizada}
                            onChange={(e) => handleUpdateFinalizada(tarefa.id, e.target.checked)}
                          />
                        </label>
                        <EditButton onClick={handleNextEdit}>Editar Tarefa</EditButton>
                        <DeleteButton onClick={() => handleDeleteButtonClick(tarefa.id)}>Excluir Tarefa</DeleteButton>
                      </div>
                    </TaskDetails>
                  )}
                </TaskItem>
              ))}
            </TaskList>
            <Button onClick={handleNextCadastro}>Criar Nova Tarefa</Button>
          </>
        )}
      </Container>
    </Page>
  );
};

export default ListTarefas;
