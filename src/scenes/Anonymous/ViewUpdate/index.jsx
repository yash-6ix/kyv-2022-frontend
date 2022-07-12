import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import updatesService from '../../../services/updates/updatesService';
import config from '../../../config/config';

const stripURL = (input) => {
    console.log(input);
    const url = new URL(input);
    return url.hostname;
};

const ViewUpdate = () => {
    const { updateid } = useParams();

    const [update, setUpdate] = useState({});

    useEffect(() => {
        (async () => {
            const data = await updatesService.fetchUpdateById(updateid, {
                populateTopics: true,
            });
            setUpdate((u) => ({ ...u, ...data }));
        })();
    }, [updateid]);

    return (
        <div className="flex justify-center">
            <div className="grid max-w-5xl grid-cols-12 gap-4">
                <div className="flex flex-row flex-wrap col-span-12 mt-12">
                    {update.topics &&
                        update.topics.map((topic) => (
                            <a
                                key={topic._id}
                                href={
                                    config.frontendUrl +
                                    '/user/topic/' +
                                    topic.slug
                                }
                                className="px-4 py-1 mb-3 mr-3 text-xl font-bold rounded-lg bg-brand-olive-900 text-brand-white font-heading"
                            >
                                {topic.name}
                            </a>
                        ))}
                </div>
                <div className="col-span-12">
                    <h3 className="mb-8 tracking-tight my-8t-16 text-7xl font-title text-brand-olive-900">
                        {update.title}
                    </h3>
                </div>
                {/* <div className="col-span-12">
                    <div
                        className="mb-4 font-body text-brand-neutral-900"
                        style={{ columnCount: 2, columnGap: '16px' }}
                        dangerouslySetInnerHTML={{ __html: update.description }}
                    />
                </div> */}
                <div className="col-span-12 view-update-full-article">
                    <div
                        className="mb-4 font-body text-brand-neutral-900"
                        dangerouslySetInnerHTML={{ __html: update.fullarticle }}
                    />
                </div>
                <div className="flex flex-col col-span-4 py-4 space-y-4 ">
                    <h3 className="text-xl font-body">{update.type}</h3>
                    <h2 className="text-sm font-bold tracking-widest font-body text-brand-neutral-300">
                        TYPE
                    </h2>
                </div>
                <div className="flex flex-col col-span-4 py-4 space-y-4 ">
                    <a
                        href={update.sourceurl}
                        className="text-xl underline font-body text-brand-olive-900"
                    >
                        {update.sourceurl && stripURL(update.sourceurl)}
                    </a>
                    <h2 className="text-sm font-bold tracking-widest font-body text-brand-neutral-300">
                        SOURCE
                    </h2>
                </div>
                <div className="flex flex-col col-span-4 py-4 space-y-4 ">
                    <h3 className="text-xl font-body">
                        {new Date(update.createdon).toDateString()}
                    </h3>
                    <h2 className="text-sm font-bold tracking-widest font-body text-brand-neutral-300">
                        POSTED
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default ViewUpdate;
