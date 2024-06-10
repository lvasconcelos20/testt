import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Form, Input, TextArea, Select, Button, BoxFinish, Page } from './style';

const CadastroTarefa = () => {
    const [name, setName] = useState('');
    const [descricao, setDescricao] = useState('');
    const [finalizada, setFinalizada] = useState('n'); 
    const [dataTerminoStr, setDataTerminoStr] = useState('');
    const [prioridade, setPrioridade] = useState('baixa');
    const [membroEmail, setMembroEmail] = useState('');
    const [error, setError] = useState(''); 
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataTermino = dataTerminoStr ? dataTerminoStr.replace(/[^0-9]/g, '') : undefined;
        const formattedDataTermino = dataTermino ? dataTermino.slice(0, 4) + '-' + dataTermino.slice(4, 6) + '-' + dataTermino.slice(6) : undefined;

    
        const finalizadaBool = finalizada === 's';

        const tarefa = {
            name,
            descricao,
            finalizada: finalizadaBool, 
            data_termino: formattedDataTermino,
            prioridade,
            membroEmail,
        };

        try {
            const response = await api.post('/tarefa', tarefa); 
            if (response.status === 201) {
                alert('Tarefa cadastrada com sucesso!');
                setName('');
                setDescricao('');
                setFinalizada('n');
                setDataTerminoStr('');
                setPrioridade('baixa');
                setMembroEmail('');
                setErrors({});
                setError(''); 
            }
        } catch (error) {
            console.error('Erro ao cadastrar a tarefa:', error);

         
            let errorMessage = 'Erro ao cadastrar a tarefa. Por favor, tente novamente.';

            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data.message.includes('nome já existe')) {
                        errorMessage = 'Uma tarefa com este nome já existe';
                    } else if (error.response.data.message.includes('Data de término é obrigatória para tarefas finalizadas')) {
                        errorMessage = 'Data de término é obrigatória para tarefas finalizadas';
                    } else if (error.response.data.message.includes('Todos os campos obrigatórios devem ser preenchidos')) {
                        errorMessage = 'Todos os campos obrigatórios devem ser preenchidos';
                    } else if (error.response.data.message.includes('Membro não cadastrado no sistema')) {
                        errorMessage = 'Membro não cadastrado no sistema';
                    }
                } else if (error.response.status === 404) {
                    errorMessage = 'Tarefa não encontrada';
                } else if (error.response.status === 403) {
                    errorMessage = 'Tarefas finalizadas não podem ser editadas';
                }
            }

            setError(errorMessage);
        }
    };

    return (
        <Page>
            <Container>
                <h2>Cadastro de Tarefa</h2>
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
                    <Input
                        type="date"
                        value={dataTerminoStr}
                        onChange={(e) => setDataTerminoStr(e.target.value)}
                    />
                    {errors.dataTermino && <p style={{ color: 'red' }}>{errors.dataTermino}</p>}
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {errors.membroEmail && <p style={{ color: 'red' }}>{errors.membroEmail}</p>}
                    <BoxFinish>
                        <span>Finalizada</span>
                        <Input
                            type="checkbox"
                            checked={finalizada === 's'} 
                            onChange={(e) => setFinalizada(e.target.checked ? 's' : 'n')}
                        />
                    </BoxFinish>
                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Container>
        </Page>
    );
};

export default CadastroTarefa;
