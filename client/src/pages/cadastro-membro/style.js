// style.js

import styled from 'styled-components';

// Estilo principal da página
export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f3f3;
`;

// Container principal para o conteúdo
export const Container = styled.div`
  width: 80%;
  max-width: 400px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

// Formulário de entrada
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

// Campo de entrada de texto
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 16px;
`;

// Botão principal
export const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }
`;
