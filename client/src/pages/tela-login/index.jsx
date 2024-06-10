import React from 'react';
import { Page, Container, Title, StyledCard, Input, Button, Form, NavLink } from './style';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const history = useHistory();

    const handleRegisterClick = () => {
        history.push('../cadastro-membro');
    };

    return (
        <Page>
            <Container>
                <StyledCard>
                    <Title>Login</Title>
                    <Form>
                        <Input type="email" placeholder="Email" />
                        <Input type="password" placeholder="Password" />
                        <Button type="submit">Login</Button>
                        <NavLink onClick={handleRegisterClick}>Cadastrar</NavLink>
                    </Form>
                </StyledCard>
            </Container>
        </Page>
    );
}

export default LoginPage;
