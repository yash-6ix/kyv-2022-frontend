import React, { useState } from 'react';
import styled from 'styled-components';

import { ThemeContainer } from "../../../components/ThemeContainer";
import { ThemeButtonLoader } from "../../../components/ThemeButtonLoader.js";
import OverlayTemplate from '../../../components/Overlays/OverlayTemplate';
import candidatesService from '../../../services/candidates/candidatesService';

import { wards } from '../../../constants/wards';
import { ThemeButton } from '../../../components/ThemeButton';


const NewCandidateOverlay = ({ closeOverlay }) => {
    const [showResponse, setShowResponse] = useState(false)
    const [loading, setLoading] = useState(false)
    const [candidateFormData, setCandidateFormData] = useState({
        fullname: '',
        ward: ''
    })

    const onChange = (e) => {
        setCandidateFormData({ ...candidateFormData, [e.target.name]: e.target.value });
    };

    const newCandidateCall = async () => {
        setLoading(true)
        const newCandidateResponse =  await candidatesService.addCandidate({fullname: candidateFormData.fullname, ward: candidateFormData.ward})
        console.log(newCandidateResponse)
        setLoading(false)
        setShowResponse(true)

    }

    return (
            <OverlayTemplate>
                <ThemeContainer>
                    <Main>
                        <Close onClick={() => closeOverlay()}>x</Close>
                        <P1>Add a new Candidate</P1>                         
                        {
                            showResponse ? 
                            <>
                                <SuccessMsg>Great! You've added <b>{candidateFormData.fullname}</b> to ward <b>{candidateFormData.ward}</b>.</SuccessMsg>
                            </>
                            :
                            <>
                                <Label>Fullname</Label>
                                <Input name="fullname" id="fullname" value={candidateFormData.fullname} onChange={onChange} type="text" />
                                <Label>Ward</Label>
                                <Select value={candidateFormData.ward} onChange={(e) => setCandidateFormData({...candidateFormData, ward: e.target.value})}>
                                    {
                                        wards.map((item, index) => {
                                            return (<option key={index} value={item}>{item}</option>)
                                        })
                                    }
                                </Select> 
                                {
                                    loading ? 
                                    <ThemeButtonLoader />
                                    : 
                                    <ThemeButton buttonText={"Submit"} customAction={() => newCandidateCall()} />
                                }
                            </>
                        }
                    </Main>
                </ThemeContainer>
            </OverlayTemplate>
    );
}

export default NewCandidateOverlay;

const Main = styled.div`
    min-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 30px;
    position: relative;
`

const Close = styled.p`
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 24px;
    font-family: 'Arial';
    /* font-weight: 100; */
    cursor: pointer;
    border: 1px solid grey;
    padding: 7px 10px 10px 10px;
    border-radius: 30px;
    line-height: 15px;
`

const P1 = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
`

const SuccessMsg = styled.p`
    text-align: center;
`

const Label = styled.p`
    font-size: 12px;
`

const Input = styled.input`
    border-bottom: 1px solid grey;
    margin-bottom: 20px;
    width: 280px;
`

const Select = styled.select`
    border: 1px solid grey;
    margin-bottom: 40px;
    width: 280px;
`