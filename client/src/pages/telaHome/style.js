
import styled from 'styled-components';

export const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
`;

export const Container = styled.div`
    width: 80%;
    max-width: 800px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 50vh;
`;

export const Tittle = styled.h2`
display: flex;
 align-items: center;
 justify-content: center;

`

export const Menu = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

export const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

