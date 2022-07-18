import React, { useEffect, useState } from 'react';
import styled from "styled-components";

import { ThemeContainer } from "../../../components/ThemeContainer";
import { ThemePageBg } from "../../../components/ThemePageBg";
import { ThemeLink } from "../../../components/ThemeLink";
import candidatesService from '../../../services/candidates/candidatesService';
import { ThemeButton } from '../../../components/ThemeButton'
import NewCandidateOverlay from './NewCandidateOverlay';

const ManageCandidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [newCandidateModal, setNewCandidateModal] = useState(false)

    useEffect(() => {
        (async () => {
            const candidates = await candidatesService.fetchCandidates()
            setCandidates(candidates);
        })();
    }, [])

    const closeModal = async () => {
        const candidates = await candidatesService.fetchCandidates()
        setCandidates(candidates);
        setNewCandidateModal()
    }

    return (
        <ThemePageBg>
            {
                newCandidateModal ? 
                <NewCandidateOverlay closeOverlay={() => closeModal(false)} />
                : null
            }

            <ThemeContainer pgWidth={true}>
                <Row>
                    <Col>
                        <Label>Admin Panel</Label>
                        <H1>Manage Candidates</H1>
                    </Col>

                    <ThemeButton buttonText={"New Candidate"} customAction={() => setNewCandidateModal(!newCandidateModal)} />
                </Row>
            </ThemeContainer>

            <ThemeContainer pgWidth={true}>
                <H2>All Candidates</H2>
                <hr />
                
                {
                    candidates && candidates.map((item, index) => {
                        return <Candidate key={index}>
                            <Left>
                                <Name>{item.fullname}</Name>
                                <Ward>{item.ward}</Ward>
                            </Left>

                            <Center>
                                <C1>Questions answered: 7</C1>
                                <C1>Followers: 1,937</C1>
                            </Center>

                            <Right>
                                <ThemeLink buttonText={"Edit"} to={"/admin/edit-candidate/[candi_id]"} />
                            </Right>
                        </Candidate>
                    })
                }
            </ThemeContainer>
        </ThemePageBg>
    );
};


export default ManageCandidates;


const Row = styled.div`
    display: flex;
    justify-content: space-between;
`

const Col = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`

const Label = styled.p``

const H1 = styled.h1`
    font-size: 38px;
    font-weight: bold;
`

const H2 = styled.h2`

`;

const Candidate = styled.div`
    display: flex;
    padding: 20px;
`

const Left= styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 20px;
`

const Name = styled.p`
    font-size: 14px;
`

const Ward = styled.p`
    font-size: 12px;
`

const Center = styled.div`
    flex: 4;
`

const C1 = styled.p`
    font-size: 14px;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`