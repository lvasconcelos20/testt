

import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f3f3;
`;


export const Container = styled.div`
  width: 80%;
  max-width: 800px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;


export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
`;


export const TaskList = styled.div`
  margin-bottom: 20px;
`;


export const TaskItem = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &.selected {
    background-color: #f0f8ff;
  }

  &:hover {
    background-color: #f0f8ff;
  }
`;


export const TaskDetails = styled.div`
  margin-top: 10px;
  padding: 15px;
  border-top: 1px solid #d3d3d3;
`;

export const EditButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;


export const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }
`;


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

