import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import topicsService from '../../../services/topics/topicsService';
import updatesService from '../../../services/updates/updatesService';

import config from '../../../config/config'

const removeTags = (str) => {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
};

const Topic = () => {
    const { slug } = useParams();

    //updates that have this topic
    const [updates, setUpdates] = useState([]);

    const [topic, setTopic] = useState({});

    useEffect(() => {
        (async () => {
            const topic = await topicsService.findTopicBySlug(slug);
            if (!topic) return;
            //404
            setTopic(topic);

            const updates = await updatesService.fetchUpdates(
                {
                    topicId: topic._id,
                },
                { populateTopics: true }
            );
            setUpdates(updates);
        })();
    }, [slug]);

    return (
        <div className="flex justify-center flex-1 bg-brand-neutral-25">
            <div className="grid self-start w-full max-w-5xl grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h2 className="mt-8 font-bold tracking-widest font-body text-brand-neutral-300">
                        TOPIC
                    </h2>
                    <h1 className="mb-12 text-5xl tracking-tight text-brand-olive-900 font-title">
                        {topic.name}
                    </h1>
                </div>
                <div className="col-span-12">
                    <div className="space-y-12">
                        {updates.map((update) => {
                            console.log(update);
                            return (
                                <a
                                    href={
                                        config.frontendUrl + '/user/update/' +
                                        update._id
                                    }
                                    key={update._id}
                                    className="flex flex-col pb-2 pr-6 border-r-4 border-brand-neutral-900"
                                >
                                    <h2 className="text-sm font-body">
                                        {new Date(
                                            update.createdon
                                        ).toDateString()}
                                    </h2>
                                    <h1 className="mb-2 text-4xl tracking-tight font-heading text-brand-olive-900">
                                        {update.title}
                                    </h1>
                                    <p
                                        className="font-body"
                                    // style={{ columnCount: 2 }}
                                    >
                                        {removeTags(update.description).length > 250
                                            ? removeTags(update.description).slice(0, 250) +
                                            '...'
                                            : removeTags(update.description)}
                                    </p>
                                    <div className="flex flex-row ">
                                        {update.topics.map((topic) => (
                                            <div
                                                key={topic._id}
                                                className="px-3 py-1 mt-2 mr-2 font-bold rounded-lg font-heading text-brand-white bg-brand-olive-900"
                                            >
                                                {topic.name}
                                            </div>
                                        ))}
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic;
