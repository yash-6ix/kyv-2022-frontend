import {
    LiberalSVG,
    GreenSVG,
    BlocQSVG,
    ConservativeSVG,
    NdpSVG,
} from '../SVG';

const partyColors = {
    NDP: 'bg-brand-NDP-500',
    Liberal: 'bg-brand-Liberal-500',
    Conservative: 'bg-brand-Conservative-500',
    Green: 'bg-brand-Green-500',
    PPC: 'bg-brand-PPC-500',
    BlocQ: 'bg-brand-BlocQ-500',
    Independent: 'bg-brand-Independent-500',
};
const partyIcons = {
    Liberal: <LiberalSVG className="w-14" />,
    Green: <GreenSVG />,
    BlocQ: <BlocQSVG />,
    Conservative: <ConservativeSVG className="w-14" />,
    NDP: <NdpSVG className="w-14" />,
};

export const Candidate = ({ name, projectedWinner, party, percentage }) => {
    const partyColor = partyColors[party] || 'bg-white';

    const partyIcon = partyIcons[party] || <></>;
    return (
        <div className="relative flex flex-row w-full h-32 border-b border-brand-neutral-100">
            {/* party color vertical bar */}
            <div className="w-6 h-full p-2 ">
                <div className={`${partyColor} h-full w-full`}></div>
            </div>
            <div className="flex flex-col py-3 pr-6">
                <h3 className="text-2xl font-bold text-black font-heading">
                    {name}
                </h3>
                {projectedWinner && (
                    <h4 className="font-body text-brand-neutral-600">
                        Projected Winner
                    </h4>
                )}
                <h4 className="mt-auto text-xl font-bold tracking-wide font-heading text-brand-neutral-600">
                    {percentage}
                </h4>
            </div>
            {/* might change this from being absolute */}
            <div className="absolute bottom-4 right-6">{partyIcon}</div>
        </div>
    );
};
