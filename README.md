# Projeto “To Do List”

## Introdução

O projeto “To Do List” é uma aplicação web desenvolvida para gerenciar tarefas e membros em uma plataforma de organização pessoal. Ele foi desenvolvido como um projeto de aprendizado e aplicação prática de boas práticas de desenvolvimento e organização de código.

## Regras de Negócio

1. **Tarefa:**
   - ID: Identificador único da tarefa.
   - Nome: Nome da tarefa (mínimo 5, máximo 50 caracteres).
   - Descrição: Descrição detalhada da tarefa (máximo 140 caracteres).
   - Finalizada: Indica se a tarefa foi concluída ou não (True ou False).
   - Data de Término: Data e hora de término quando a tarefa for finalizada.
   - Prioridade: Prioridade da tarefa (Baixa, Média, Alta).

2. **Membro:**
   - ID: Identificador único do membro.
   - Email: E-mail do membro (único e válido).
   - Nome: Nome do membro (mínimo 5 caracteres).

## Features Obrigatórias

1. **Implementação dos atributos e suas restrições para a classe Tarefa**
2. **Implementação dos atributos e suas restrições para a classe Membro**
3. **Tela de Cadastro de Tarefa:** Permite o cadastro de tarefas, incluindo nome, descrição, prioridade e finalização.
4. **Tela de Edição de Tarefa:** Permite a edição de qualquer atributo, exceto a data de término. Também permite deletar uma tarefa.
5. **Tela de Listagem de Tarefas:** Exibe todas as tarefas ou tarefas de um membro específico, incluindo a descrição, edição de finalização, botão de edição e exclusão.
6. **Tela de Cadastro de Membro:** Permite o cadastro de membros com nome e e-mail.
7. **Tela Home:** Tela de navegação com menus para ir para as telas de listagem de tarefas e cadastro de membros.
8. **Tela de Login:** Permite autenticação de usuário.

## Requisitos Técnicos

- **Back-End:**
  - Utilizar TypeScript com framework Node.js (Express) e ORM Prisma.
  - Persistência de dados no MySQL.
  - Utilização de Insomnia para testes.
  - Autenticação com JWT.

- **Front-End:**
  - React com Next.js.
  - JavaScript e HTML com frameworks como React ou Next.js.
  - Estilização com Style-Components.

## Estrutura do Projeto

- **Branchs por Feature:** Cada funcionalidade deve ser desenvolvida em uma branch separada e posteriormente mesclada na branch principal.
- **Branch Principal:** Com todos os merges das branches de feature.

## Boas Práticas de Desenvolvimento

- Organização de código.
- Boas práticas de desenvolvimento (API RESTful, validações de entrada, gestão de erro).
- Clareza nos commits do GitHub.

## Como Rodar o Projeto

1. **Pré-requisitos:**
   - Node.js e npm instalados.
   - MySQL instalado e configuração do banco de dados no arquivo de configuração.

2. **Configuração do banco de dados:**
   - Crie um banco de dados no MySQL conforme as configurações necessárias para o projeto.

3. **Instalação das dependências:**
   - No diretório do projeto, rode o comando:
     ```bash
     yarn install
     ```

4. **Rodar o servidor:**
   - No diretório do back-end do projeto, rode o comando:
     ```bash
     yarn dev
     ```

5. **Rodar o front-end:**
   - No diretório do front-end do projeto, rode o comando:
     ```bash
     yarn dev
     ```

6. **Acessar a aplicação:**
   - Acesse o endereço indicado pelo servidor em seu navegador.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias, correções ou novas features.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

