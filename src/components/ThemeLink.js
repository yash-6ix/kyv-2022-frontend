import styled from "styled-components";
import { Link } from "react-router-dom";

export const ThemeLink = ({ buttonText, to }) => {
    return <Button to={to}>{buttonText}</Button>;
};

const Button = styled(Link)`
    margin: auto 0;
    background-color: #1f2e53;
    padding: 10px 20px;
    color: white;
`;
