import React, { useState } from "react";
import { Container, Form, Input, TextArea, Select, Button, Page } from "./style";


const CadastroTarefa = () => {
  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [finalizada, setFinalizada] = useState(false);
  const [dataTermino, setDataTermino] = useState("");
  const [prioridade, setPrioridade] = useState("BAIXA");
  const [membroEmail, setMembroEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "O nome da tarefa é obrigatório.";
    }

    if (!descricao.trim()) {
      errors.descricao = "A descrição é obrigatária ";
    }

    if (!dataTermino) {
      errors.dataTermino = "A data de término é obrigatória após finalizar a tarefa.";
    }

    if (!membroEmail.trim() || !/\S+@\S+\.\S+/.test(membroEmail)) {
      errors.membroEmail = "Este email é inválido.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza a validação do formulário
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Exibe mensagens de erro para os campos inválidos
      return; // Sai da função se houver erros
    }

    const tarefa = {
      name,
      descricao,
      finalizada,
      data_termino,
      prioridade,
      membroEmail,
    };

    try {
      const response = await api.post("/tarefas", tarefa);
      console.log("Tarefa cadastrada com sucesso:", response.data);
      alert("Tarefa cadastrada com sucesso!");
      // Reseta os campos do formulário após o envio bem-sucedido
      setName("");
      setDescricao("");
      setFinalizada(false);
      setDataTermino("");
      setPrioridade("BAIXA");
      setMembroEmail("");
      setErrors({}); // Limpa os erros após o envio bem-sucedido
    } catch (error) {
      console.error("Erro ao cadastrar a tarefa:", error);
      alert("Erro ao cadastrar a tarefa. Por favor, tente novamente.");
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
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          <TextArea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          {errors.descricao && <p style={{ color: "red" }}>{errors.descricao}</p>}
          <Input
            type="date"
            value={dataTermino}
            onChange={(e) => setDataTermino(e.target.value)}
          />
          {errors.dataTermino && <p style={{ color: "red" }}>{errors.dataTermino}</p>}
          <Select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="ALTA">Alta</option>
          </Select>
          <Input
            type="email"
            placeholder="Email do Membro"
            value={membroEmail}
            onChange={(e) => setMembroEmail(e.target.value)}
          />
          {errors.membroEmail && <p style={{ color: "red" }}>{errors.membroEmail}</p>}
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Container>
    </Page>
  );
};

export default CadastroTarefa;
