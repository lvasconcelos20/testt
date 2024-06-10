import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Form, Input, Button, Page } from './style';

const CadastroMembro = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar se todos os campos obrigatórios foram preenchidos
        if (!name || !email || !password) {
            setErrors({
                name: !name ? 'Nome é obrigatório' : undefined,
                email: !email ? 'Email é obrigatório' : undefined,
                password: !password ? 'A senha é obrigatória' : undefined,
            });
            return;
        }

        // Verificar se a senha tem pelo menos 3 caracteres
        if (password.length < 3) {
            setErrors({
                ...errors,
                password: 'A senha deve ter no mínimo 3 caracteres',
            });
            return;
        }

        const membro = {
            name,
            email,
            password,
        };

        try {
            const response = await api.post('/member', membro);

            if (response.status === 201) {
                alert('Membro cadastrado com sucesso!');
                setName('');
                setEmail('');
                setPassword('');
                setErrors({});
                setError('');
            }
        } catch (error) {
            console.error('Erro ao cadastrar o membro:', error);

            let errorMessage = 'Erro ao cadastrar o membro. Por favor, tente novamente.';

            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data.message.includes('e-mail já está registrado')) {
                        errorMessage = 'Este e-mail já está registrado';
                    } else if (error.response.data.message.includes('Todos os campos obrigatórios devem ser preenchidos')) {
                        errorMessage = 'Todos os campos obrigatórios devem ser preenchidos';
                    }
                } else if (error.response.status === 404) {
                    errorMessage = 'Membro não encontrado';
                }
            }

            setError(errorMessage);
        }
    };

    return (
        <Page>
            <Container>
                <h2>Cadastro de Membro</h2>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Container>
        </Page>
    );
};

export default CadastroMembro;
