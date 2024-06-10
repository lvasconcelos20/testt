import React from 'react';
import { Container, Menu, Button, Page, Title, StyledCard } from './style';
import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();

    const handleNavigateToTarefas = () => {
        router.push('/listagemTarefas');
    };

    const handleNavigateToCadastroMembros = () => {
        router.push('/cadastro-membro');
    };

    return (
        <Page>
            <Container>
                <Title>Bem-vindo à Gestão de Tarefas</Title>
                <StyledCard>
                    <Menu>
                        <Button onClick={handleNavigateToTarefas}>Listagem de Tarefas</Button>
                        <Button onClick={handleNavigateToCadastroMembros}>Cadastro de Membros</Button>
                    </Menu>
                </StyledCard>
            </Container>
        </Page>
    );
};

export default Home;