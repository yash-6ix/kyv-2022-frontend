import styled from "styled-components";

export const ThemeButton = ({ buttonText, customAction }) => {
    return <Button onClick={() => customAction()}>{buttonText}</Button>;
};

const Button = styled.button`
    margin: auto 0;
    background-color: #1f2e53;
    padding: 10px 20px;
    color: white;
    max-width: 200px;
    width: 50%;
`;
