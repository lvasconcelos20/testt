
import React, { useState } from "react";
import { Page, Container, Title, StyledCard, Input, Button, Form, NavLink } from "./style";
import api from "../../services/api";
import { useRouter } from "next/router";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    const handleRegisterClick = () => {
        route.push("../cadastro-membro");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const credentials = { email, password };

        try {
            const response = await api.post("/login", credentials);

            if (response.status === 200) {
                const { accessToken } = response.data;
                alert("Login bem-sucedido!");

                localStorage.setItem("accessToken", accessToken);

        
                route.push("../telaHome");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            let errorMessage = "Erro ao fazer login. Por favor, tente novamente.";

            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = "Credenciais inválidas.";
                } else if (error.response.status === 404) {
                    errorMessage = "Membro não encontrado";
                } else if (error.response.status === 401) {
                    errorMessage = "Senha Incorreta";
                }
            }

            setError(errorMessage);
            setLoading(false);
        }
    };

    return (
        <Page>
            <Container>
                <StyledCard>
                    <Title>Login</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <Button type="submit" disabled={loading}>
                            {loading ? "Carregando..." : "Login"}
                        </Button>
                        <NavLink onClick={handleRegisterClick}>Cadastrar</NavLink>
                    </Form>
                </StyledCard>
            </Container>
        </Page>
    );
};

export default LoginPage;
