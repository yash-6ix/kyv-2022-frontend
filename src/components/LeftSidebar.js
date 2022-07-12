import {
    MapSVG,
    CandidatesSVG,
    QuestionSVG,
    LogoutSVG,
    DashboardSVG,
} from './SVG';

import { LinkItem } from './LinkItem';
import { useHistory } from 'react-router-dom';
import tokenAuthService from '../services/tokenAuth/tokenAuthService';
import Utils from '../util/utils';

export const LeftSidebar = () => {
    const history = useHistory();

    const logout = () => {
        tokenAuthService.logout();
        history.push('/user');
    };

    return (
        <div className="flex-col hidden overflow-auto border-r lg:flex lg:w-64 2xl:w-72 bg-brand-white border-brand-neutral-100 min-height-no-header">
            <div className="w-full mt-4 space-y-1">
                {Utils.getLoggedUserRole() === 'Admin' ? (
                    <>
                        <LinkItem
                            to="/admin/all-clients"
                            title="Clients"
                            icon={<CandidatesSVG />}
                        />
                        <LinkItem
                            to="/admin/updates"
                            title="Updates"
                            icon={<CandidatesSVG />}
                        />
                        <LinkItem
                            to="/admin/commitments"
                            title="Commitments"
                            icon={<CandidatesSVG />}
                        />
                    </>
                ) : (
                    <>
                        <LinkItem
                            to="/ridings-map"
                            title="Ridings Map"
                            icon={<MapSVG />}
                        />
                        <LinkItem
                            to="/commitment-tracker"
                            title="Commitment Tracker"
                            icon={<DashboardSVG />}
                        />
                        <LinkItem
                            to="/all-candidates"
                            title="All Candidates"
                            icon={<CandidatesSVG />}
                        />
                        <LinkItem
                            to="/ask-the-candidates"
                            title="Ask the Candidates"
                            icon={<QuestionSVG />}
                        />
                    </>
                )}
                <LinkItem
                    disabled
                    title="Logout"
                    icon={<LogoutSVG />}
                    onClick={logout}
                />
            </div>
            <div className="mt-auto">
                <h5 className="p-6 text-sm text-black font-body">
                    © {new Date().getFullYear()} Delphic Research
                </h5>
            </div>
        </div>
    );
};
