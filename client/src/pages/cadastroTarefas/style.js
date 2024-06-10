import styled from "styled-components";

export const Page = styled.div`
display: flex;
flex-direction: center;
justify-content: center;
align-items: center;
margin-top: 8vh;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px;
  padding: 20px;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  background-color: #f0f4f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
  justify-content: center;

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px; 
  gap: 10px; 
`;

export const Input = styled.input`
  padding: 12px;
  border: 2px solid #4a90e2;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #4a90e2;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  outline: none;
  resize: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
  }
`;

export const Select = styled.select`
  padding: 12px;
  border: 2px solid #4a90e2;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
  }
`;

export const Button = styled.button`
  padding: 14px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
  }
`;


export const BoxFinish = styled.div`
  display: flex;
  align-items: center; 
  gap: 10px; 
  margin-bottom: 10px;
  margin-left: 10vw;
  margin-top: 10px
`