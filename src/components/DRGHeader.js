import {
    HamburgerSVG,
    QuestionSVG,
    MapSVG,
    CandidatesSVG,
    CloseSVG,
    LogoutSVG,
} from './SVG';
import { KYVLogoSVG } from '../assets/kyv-logo';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHistory } from 'react-router';

import Utils from '../util/utils';
import tokenAuthService from '../services/tokenAuth/tokenAuthService';
import { LinkItem } from './LinkItem';

const Header = () => {
    const [hamburgerShown, setHamburgerShown] = useState(false);

    const onClickLink = () => {
        setHamburgerShown(false);
    };

    const history = useHistory();

    const logout = () => {
        onClickLink();
        tokenAuthService.logout();
        history.push('/user');
    };

    console.log(Utils.getLoggedUserRole());

    return (
        /**
         * h-headerheight uses clamp() between two values for responsiveness
         */
        <div className="relative flex h-headerHeight ">
            {/* header left - logo */}
            <div className="absolute top-0 z-30 flex flex-1 w-screen h-full p-4 border-b sm:p-5 md:p-6 border-brand-neutral-100 bg-brand-white">
                <div className="flex justify-start flex-1 ">
                    <KYVLogoSVG /> 
                </div>
                {/* header center - title */}
                {/* <div className="flex items-center justify-center flex-1">
                    <h1 className="hidden text-3xl leading-6 text-center lg:block font-title text-brand-olive-900">
                        ELECTION MONITOR
                    </h1>
                </div> */}
                {/* header right - profile */}
                <div className="flex items-center justify-end flex-1 ml-auto">
                    {/* will replace this with logged in users image */}
                    {/* <button className="w-14 h-14">
                    <BellSVG className="fill-current w-7 h-7 text-brand-neutral-200" />
                </button>
                <button className="rounded-full shadow-xl w-14 h-14">
                    <ProfileImageSVG className="w-14 h-14" />
                </button> */}
                    <button
                        onClick={() => setHamburgerShown(!hamburgerShown)}
                        className="flex items-center justify-center w-12 h-12 transition rounded-full md:w-16 md:h-16 lg:hidden hover:bg-brand-neutral-50 active:bg-brand-neutral-100 hover:shadow-xl"
                    >
                        {hamburgerShown ? (
                            <CloseSVG className="w-5 h-5 fill-current md:w-7 md:h-7 text-brand-olive-900" />
                        ) : (
                            <HamburgerSVG className="w-8 h-8 fill-current md:w-10 md:h-10 text-brand-olive-900" />
                        )}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {hamburgerShown && (
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: '100%' }}
                        exit={{ y: 0 }}
                        transition={{ ease: 'easeInOut' }}
                        className="absolute bottom-0 left-0 z-20 w-full pt-4 pb-1 space-y-1 border-b bg-brand-white lg:hidden border-brand-neutral-100"
                    >
                        {Utils.getLoggedUserRole() === 'Admin' ? (
                            <>
                                <LinkItem
                                    to="/admin/all-clients"
                                    title="All Clients"
                                    icon={<CandidatesSVG />}
                                />
                                <LinkItem
                                    to="/admin/updates"
                                    title="All Updates"
                                    icon={<CandidatesSVG />}
                                />
                            </>
                        ) : (
                            <>
                                <LinkItem
                                    to="/ridings-map"
                                    title="Ridings Map"
                                    onClick={onClickLink}
                                    icon={<MapSVG />}
                                />
                                <LinkItem
                                    to="/all-candidates"
                                    title="All Candidates"
                                    onClick={onClickLink}
                                    icon={<CandidatesSVG />}
                                />
                                <LinkItem
                                    to="/ask-the-candidates"
                                    title="Ask the Candidates"
                                    onClick={onClickLink}
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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default Header;
