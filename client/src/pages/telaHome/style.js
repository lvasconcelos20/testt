
import styled from 'styled-components';

export const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
    padding: 20px;
`;

export const Container = styled.div`
    width: 70%;
    max-width: 900px;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: #333;
`;

export const Menu = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
`;

export const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`;

export const StyledCard = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;
