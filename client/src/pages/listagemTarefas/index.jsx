import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Container, Form, Input, TaskList, TaskItem, Page, Loading, NoResults, TaskDetails, EditButton, DeleteButton, Button } from './style';
import { useRouter } from 'next/router';

const ListTarefas = () => {
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (email) {
      listarTarefas();
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

  const handleUpdateFinalizada = async (email, finalizada) => {
    try {
      await api.patch(`/tarefa/${email}`, { finalizada });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.email === email ? { ...task, finalizada } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDelete = async (name, email) => {
    if (isDeleting) return;
    setIsDeleting(true);


    setTasks((prevTasks) => prevTasks.filter((task) => task.name !== name || task.email !== email));

    try {
      await api.delete(`/tarefa/${name}/${email}`);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);

  
      listarTarefas();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNextEdit = () => {
    if (selectedTask?.finalizada) return;
    router.push('../editTarefa');
  };

  const handleNextCadastro = () => {
    router.push('../cadastroTarefas');
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
        <>
          <TaskList>
            {tasks.map((tarefa, index) => (
              <TaskItem
                key={index}
                onClick={() => handleTaskClick(tarefa)}
                className={selectedTask?.email === tarefa.email ? 'selected' : ''}
              >
                Nome: {tarefa.name}, Prioridade: {tarefa.prioridade}, Finalizada: {tarefa.finalizada ? 'Sim' : 'Não'}
                {selectedTask?.email === tarefa.email && (
                  <TaskDetails>
                    <h3>Descrição:</h3>
                    <p>{tarefa.descricao}</p>
                    <div>
                      <label>
                        Finalizada:
                        <input
                          type="checkbox"
                          checked={tarefa.finalizada}
                          onChange={(e) => handleUpdateFinalizada(tarefa.email, e.target.checked)}
                          disabled={tarefa.finalizada} 
                        />
                      </label>
                      <EditButton
                        onClick={handleNextEdit}
                        disabled={tarefa.finalizada} 
                      >
                        Editar Tarefa
                      </EditButton>
                      <DeleteButton
                        onClick={() => handleDelete(tarefa.name, tarefa.email)}
                        disabled={isDeleting} // Adiciona um estado de bloqueio para evitar múltiplos cliques
                      >
                        {isDeleting ? 'Deletando...' : 'Excluir Tarefa'}
                      </DeleteButton>
                    </div>
                  </TaskDetails>
                )}
              </TaskItem>
            ))}
          </TaskList>
          <Button onClick={handleNextCadastro}>Criar Nova Tarefa</Button>
        </>
      </Container>
    </Page>
  );
};

export default ListTarefas;
