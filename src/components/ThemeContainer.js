import styled from "styled-components";

export const ThemeContainer = ({ children, pgWidth }) => {
    return <Main pgWidth={pgWidth}>{children}</Main>;
};

const Main = styled.div`
    background-color: white;
    border: 1px solid grey;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 1px 1px 1px solid grey;
    width: ${({ pgWidth }) => (pgWidth ? "80%" : "initial")};
    max-width: 896px;
    box-shadow: 8px 8px #000;
    margin-top: 60px;
`;
