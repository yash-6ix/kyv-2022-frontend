import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
    ConservativeSVG,
    GreenSVG,
    LiberalSVG,
    NdpSVG,
} from '../../../../components/SVG';
import commitmentsService from '../../../../services/commitments/commitmentsService';
import config from '../../../../config/config'

const PARTY_ICON_MAP = {
    conservative: <ConservativeSVG className="self-start h-20" />,
    liberal: <LiberalSVG className="self-start h-20" />,
    ndp: <NdpSVG className="self-start h-20" />,
    green: <GreenSVG className="self-start h-20" />,
};
const getPartyIcon = (party) => {
    party = party.toLowerCase();
    return PARTY_ICON_MAP[party];
};

const STATUS_TRANSFORM_MAP = {
    Failed: '0%',
    Fulfilled: '0%',
    'In Policy Deliberation': '-33.3333%',
    'Commitment Made': '-66.6666%',
};

const formatDate = (date) => {
    return new Date(date).toDateString();
};

const Commitment = () => {
    const { commitmentId } = useParams();
    const [commitment, setCommitment] = useState({
        title: '',
        description: '',
        partyname: '',
        partyjurisdiction: '',
    });

    useEffect(() => {
        (async () => {
            const data = await commitmentsService.fetchCommitmentById(
                commitmentId,
                { populateTopics: true }
            );
            setCommitment(data);
        })();
    }, [commitmentId]);

    return (
        <div className="flex justify-center flex-1 p-6 bg-brand-neutral-25">
            <div className="grid self-start w-full max-w-5xl grid-cols-12">
                <div className="col-span-12">
                    <StatusBar status={commitment.commitmentstatus} />
                </div>

                <div className="col-span-12">
                    <h2 className="mt-8 font-bold tracking-widest font-body text-brand-neutral-300">
                        COMMITMENT
                    </h2>
                    <h1 className="mb-4 text-5xl tracking-tight text-brand-olive-900 font-title">
                        {commitment.title}
                    </h1>
                </div>
                <div className="flex flex-row flex-wrap col-span-12 mb-12">
                    {commitment.topics &&
                        commitment.topics.map((topic) => (
                            <a
                                href={
                                    config.frontendUrl + '/user/topic/' +
                                    topic.slug
                                }
                                className="px-4 py-1 mb-3 mr-3 text-xl font-bold rounded-lg bg-brand-olive-900 text-brand-white font-heading"
                            >
                                {topic.name}
                            </a>
                        ))}
                </div>
                <div className="col-span-12">
                    {/* topics */}

                    <p
                        className="mb-4 font-body text-brand-neutral-900"
                        style={{ columnCount: 2 }}
                    >
                        {commitment.description}
                    </p>
                </div>
                <div className="flex flex-col justify-end col-span-4 py-4 space-y-6">
                    <h3 className="text-2xl font-bold leading-none tracking-tighter font-body text-brand-olive-900">
                        {formatDate(commitment.commitmentpromiseddate)}
                    </h3>
                    <h2 className="text-sm font-bold tracking-widest font-body text-brand-neutral-300">
                        COMMITMENT DATE
                    </h2>
                </div>
                <div className="flex flex-col col-span-4 py-4 space-y-6 ">
                    {getPartyIcon(commitment.partyname)}
                    <h2 className="text-sm font-bold tracking-widest font-body text-brand-neutral-300">
                        PARTY
                    </h2>
                </div>
                <div className="flex flex-col justify-end col-span-4 py-4 space-y-6 ">
                    <h3 className="text-2xl font-bold leading-none tracking-tighter font-body text-brand-olive-900">
                        {commitment.partyjurisdiction}
                    </h3>
                    <h2 className="text-sm font-bold tracking-widest font-body text-brand-neutral-300">
                        JURISDICTION
                    </h2>
                </div>
            </div>
        </div>
    );
};
export default Commitment;

const StatusBar = ({ status }) => {
    return (
        <div className="relative h-8 overflow-hidden bg-brand-neutral-900">
            <motion.div
                initial={{ x: '-100%' }}
                animate={{
                    x: STATUS_TRANSFORM_MAP[status] || '-100%',
                }}
                className="absolute top-0 left-0 w-full h-full bg-brand-olive-700"
                transition={{
                    duration: 1,
                    ease: 'easeOut',
                    delay: 0.5,
                }}
            />
            <div className="absolute top-0 left-0 z-10 flex flex-row items-center w-full h-full">
                <div className="flex items-center justify-end flex-1 h-full pr-6 border-r-2 border-brand-neutral-25 text-brand-white font-body">
                    Commitment Made
                </div>
                <div className="flex items-center justify-end flex-1 h-full pr-6 border-r-2 border-brand-neutral-25 text-brand-white font-body">
                    In Policy Deliberation
                </div>
                <div className="flex items-center justify-end flex-1 h-full pr-6 border-r-2 border-brand-neutral-25 text-brand-white font-body">
                    Failed/Fulfilled
                </div>
            </div>
        </div>
    );
};
