import { Dropdown } from './Dropdown';
import { useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { ArrowSVG, DelphicPatternSVG } from '../SVG';
import { Candidate } from './Candidate';

export const MapRightSidebar = ({ active, ridingData, onClose }) => {
    const variants = {
        hidden: { x: 'calc(100% )' },
        visible: { x: 0 },
    };
    const controls = useAnimation();

    useEffect(() => {
        if (active) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [active, controls]);

    return (
        <motion.div
            initial={active ? 'hidden' : 'visible'}
            transition={{ duration: 0.2 }}
            variants={variants}
            animate={controls}
            className="absolute top-0 right-0 flex flex-row w-10/12 lg:w-96 height-no-header "
        >
            <button
                onClick={onClose}
                className="absolute z-50 flex items-center justify-center w-10 h-full transition border-l bg-brand-white right-96 border-brand-neutral-100 hover:bg-brand-neutral-50 active:bg-brand-neutral-100"
            >
                <ArrowSVG
                    className={`w-4 h-4 transform ${
                        active ? 'rotate-90' : '-rotate-90'
                    } fill-current text-brand-neutral-400`}
                />
            </button>
            <div className="z-10 flex-col flex-1 overflow-auto border-l height-no-header lg:flex bg-brand-white border-brand-neutral-100">
                {ridingData ? (
                    <>
                        <h2 className="p-6 text-2xl font-bold 2xl:text-3xl font-heading text-brand-olive-900">
                            {ridingData.ridingName.replace(/--/g, '–')}
                        </h2>
                        <Dropdown name="Candidates">
                            {ridingData.candidates.length === 0 ? (
                                <>
                                    <div className="pb-3 mx-6 mt-6 border-b border-brand-neutral-100">
                                        <h2 className="text-3xl font-bold font-heading text-brand-olive-900">
                                            No data
                                        </h2>
                                    </div>
                                    <p className="px-6 pt-3 mb-24 text-xl font-heading text-brand-olive-900">
                                        We're sorry, we seem to be missing
                                        candidates data for this riding. Check
                                        in soon!
                                    </p>
                                    <DelphicPatternSVG className="fill-current text-brand-neutral-50" />
                                </>
                            ) : (
                                ridingData.candidates.map((candidate) => {
                                    return (
                                        <Candidate
                                            party={candidate.party}
                                            name={candidate.fullName}
                                            key={candidate.id}
                                        />
                                    );
                                })
                            )}
                        </Dropdown>
                        {/* <SidebarDropdown name="Key Issues"></SidebarDropdown> */}
                    </>
                ) : (
                    <>
                        <div className="pb-3 mx-6 mt-6 border-b border-brand-neutral-100">
                            <h2 className="text-4xl font-bold font-heading text-brand-olive-900">
                                No riding selected
                            </h2>
                        </div>
                        <p className="px-6 pt-3 mb-24 text-xl font-heading text-brand-olive-900">
                            Select a riding on the map to view its{' '}
                            <strong>candidates</strong>,{' '}
                            <strong>demographics</strong>,{' '}
                            <strong>key issues</strong>,{' '}
                            <strong>projections</strong> and more
                        </p>
                        <DelphicPatternSVG className="fill-current text-brand-neutral-50" />
                    </>
                )}
            </div>
        </motion.div>
    );
};
