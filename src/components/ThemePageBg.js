import styled from "styled-components";
import { KYVBgDotsSVG } from "../assets/admin-bg-dots";

export const ThemePageBg = ({ children }) => {
    return (
        <Main>
            <TopImgSVGStyled />
            <Inner>{children}</Inner>
        </Main>
    );
};

const Main = styled.div`
    position: relative;
`;

const TopImgSVGStyled = styled(KYVBgDotsSVG)``;

const Inner = styled.div`
    width: 100%;
    z-index: 2;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* padding-top: 20px; */
    overflow: scroll;
    height: calc(100vh - 80px);
`;
