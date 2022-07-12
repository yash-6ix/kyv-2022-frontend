import { HamburgerSVG, QuestionSVG, MapSVG, CandidatesSVG, CloseSVG, LogoutSVG } from "./SVG";
import { KYVLogoSVG } from "../assets/kyv-logo";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useHistory } from "react-router";
import styled from "styled-components";

import Utils from "../util/utils";
import tokenAuthService from "../services/tokenAuth/tokenAuthService";
import { LinkItem } from "./LinkItem";
import { flexbox } from "@mui/system";

const Header = () => {
    const [hamburgerShown, setHamburgerShown] = useState(false);

    const onClickLink = () => {
        setHamburgerShown(false);
    };

    const history = useHistory();

    const logout = () => {
        onClickLink();
        tokenAuthService.logout();
        history.push("/user");
    };

    console.log(Utils.getLoggedUserRole());
    console.log(history);

    return (
        <Main>
            <Left>
                <KYVLogoSVG />
            </Left>
            <Center>
                <Btn current={history.location.pathname.includes("/manage-candidates")}>
                    Manage Candidates
                </Btn>
                <Btn>Change Requests</Btn>
            </Center>
            <Right></Right>
        </Main>
    );
};

export default Header;

const Main = styled.div`
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid grey;
`;

const Left = styled.div`
    width: 180px;
    border-right: 1px solid grey;
    padding-left: 20px;
    height: 80px;
    display: flex;
    align-items: center;
`;

const Center = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
`;

const Right = styled.div`
    padding-right: 20px;
    width: 180px;
    height: 80px;
    border-left: 1px solid grey;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const Btn = styled.p`
    padding: 0px 10px 0px 10px;
    font-family: "Poppins";
    color: ${({ current }) => (current ? "#bbb" : "black")};
    cursor: ${({ current }) => (current ? "initial" : "pointer")};
`;
