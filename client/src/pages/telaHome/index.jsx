
import React from 'react';
import { Container, Menu, Button, Page, Tittle } from './style';
import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();

    const handleNavigateToTarefas = () => {
        router.push('../listagemTarefas');
    };

    const handleNavigateToCadastroMembros = () => {
        router.push('../cadastro-membro');
    };

    return (
        <Page>
            <Container>
                <Tittle> <h2>Home</h2></Tittle>
               
                <Menu>
                    <Button onClick={handleNavigateToTarefas}>Listagem de Tarefas</Button>
                    <Button onClick={handleNavigateToCadastroMembros}>Cadastro de Membros</Button>
                </Menu>
            </Container>
        </Page>
    );
};

export default Home;
