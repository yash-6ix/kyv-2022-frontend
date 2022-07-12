import React, { useState, useCallback } from 'react';
// import AppHeader from '../../../components/AppHeader';
import Mapbox from '../../../components/Mapbox/Mapbox';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

import http from '../../../services/httpService';

import { useIsMobile } from '../../../hooks/useIsMobile';
import { MapRightSidebar } from '../../../components/constructs/MapRightSidebar';

/**
 * move this somewhere else later, pick a better pattern
 */
const getRidingData = async (ridingId) => {
    const response = await http.get(`/api/riding/${ridingId}`);

    let candidates = [];
    for (const candidate of response.data) {
        const party = candidate['Party Affiliation'];
        const fullName = candidate['Full Name of Candidate'];
        const twitter = candidate['Twitter Account (if they have one)'];
        const email = candidate['Campaign Email Address'];
        const website = candidate['Campaign Website'];
        const bio = candidate['Candidate Bio'];
        const id = candidate.ID;
        candidates.push({
            id,
            party,
            fullName,
            twitter,
            email,
            website,
            bio,
        });
    }
    return {
        candidates: candidates,
    };
};

const RidingsMap = () => {
    const [ridingData, setRidingData] = useState(null);
    const isMobile = useIsMobile();
    const [rightSidebarShown, setRightSidebarShown] = useState(
        isMobile ? false : true
    );

    const onClickRiding = useCallback(async (clickedRiding) => {
        setRightSidebarShown(true);

        const clickedRidingId = clickedRiding.FEDNUM;

        const ridingData = await getRidingData(clickedRidingId);
        ridingData.ridingName = clickedRiding.ENNAME;
        setRidingData(ridingData);
    }, []);
    const onCloseRightSidebar = () => {
        setRightSidebarShown(!rightSidebarShown);
    };

    return (
        <div className="relative flex flex-row flex-1 overflow-hidden height-no-header">
            {/* main */}
            <div className="flex-1 bg-brand-neutral-25 shadow-in">
                <Mapbox onClickRiding={onClickRiding} />
            </div>
            <MapRightSidebar
                active={rightSidebarShown}
                ridingData={ridingData}
                onClose={onCloseRightSidebar}
            />
        </div>
    );
};

export default RidingsMap;
