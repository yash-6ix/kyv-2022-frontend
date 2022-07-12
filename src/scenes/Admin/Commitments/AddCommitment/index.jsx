import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../../../components/Button';
import { useHistory } from 'react-router';
import { useQuery } from '../../../../hooks/useQuery';
import { AdminLayout } from '../../AdminLayout';
import Input from '../../../../components/Input';
// import Select from '../../../../components/Select';
import DatePicker from '../../../../components/DatePicker';
import commitmentsService from '../../../../services/commitments/commitmentsService';
import topicsService from '../../../../services/topics/topicsService';
import Select from '../../../../components/Select/Select';
import { omit } from 'lodash';
import { slugCase, titleCase } from '../../../../util/stringUtils';

const AddCommitment = () => {
    const history = useHistory();
    const query = useQuery();
    const commitmentId = query.get('commitmentId');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        sourcelink: '',
        commitmenttype: '',
        commitmentstatus: '',
        commitmentdate: '',
        commitmentpromiseddate: '',
        commitmentmetdate: '',
        partyname: '',
        partyjurisdiction: '',
        topics: [],
    });
    const [allTopics, setAllTopics] = useState([]);
    const [topicInputValue, setTopicInputValue] = useState('');

    useEffect(() => {
        (async () => {
            if (!commitmentId) return; //no need to fetch, not editing
            const commitment = await commitmentsService.fetchCommitmentById(
                commitmentId
            );

            //fetch and map topics
            await loadAllTopics();

            if (!commitment) return; //commitment not found
            setFormData({
                title: commitment.title,
                description: commitment.description,
                sourcelink: commitment.sourcelink,
                commitmenttype: commitment.commitmenttype,
                commitmentstatus: commitment.commitmentstatus,
                commitmentdate: commitment.commitmentdate,
                commitmentpromiseddate: commitment.commitmentpromiseddate,
                commitmentmetdate: commitment.commitmentmetdate,
                partyname: commitment.partyname,
                partyjurisdiction: commitment.partyjurisdiction,
                topics: commitment.topics,
            });
        })();
    }, [commitmentId]);

    const loadAllTopics = async () => {
        const allTopics = await topicsService.getAllTopics();
        setAllTopics(allTopics);
    };

    const selectedTopics = formData.topics
        .map((topicId) => {
            const topic = allTopics.find((topic) => {
                return topic._id === topicId;
            });
            if (!topic) return null;
            return { value: topic._id, label: topic.name };
        })
        .filter((topic) => topic !== null);

    const topicOptions = allTopics.map((topic) => ({
        value: topic._id,
        label: topic.name,
    }));

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commitmentId) {
            const response = await commitmentsService.updateCommitment(
                commitmentId,
                omit(formData, ['selectedTopics'])
            );
            if (!response.apierror) {
                toast.success('Commitment modified successfullly.');
                history.push(`/admin/commitments`);
            } else {
                toast.error(response.apierror);
            }
            return;
        }
        const response = await commitmentsService.createCommitment(
            omit(formData, ['selectedTopics'])
        );
        if (!response.apierror) {
            toast.success('Commitment created successfullly.');
            history.push(`/admin/commitments`);
        } else {
            toast.error(response.apierror);
        }
    };

    const handleCreateTopic = async (e, topic) => {
        e.preventDefault();
        const response = await topicsService.createTopic({
            name: titleCase(topic),
            slug: slugCase(topic),
        });
        if (!response.apierror) {
            toast.success('Topic created.');
            await loadAllTopics();
        } else {
            toast.error(response.error);
        }
    };

    const onSelectChange = (input, { action, option, removedValue, name }) => {
        if (name === 'topics') {
            if (action === 'select-option') {
                let newSelectedTopics = selectedTopics;
                newSelectedTopics.push(option);
                newSelectedTopics = newSelectedTopics.map(
                    (topic) => topic.value
                );
                setFormData({ ...formData, topics: newSelectedTopics });
                commitmentsService.addTopic(commitmentId, option.value);
            } else if (action === 'remove-value') {
                let newSelectedTopics = selectedTopics.slice();
                const removeIndex = newSelectedTopics.findIndex(
                    (selectedTopic) =>
                        selectedTopic.value === removedValue.value
                );
                newSelectedTopics.splice(removeIndex, 1);
                newSelectedTopics = newSelectedTopics.map(
                    (topic) => topic.value
                );
                setFormData({ ...formData, topics: newSelectedTopics });
                commitmentsService.removeTopic(
                    commitmentId,
                    removedValue.value
                );
            }
        } else {
            setFormData({ ...formData, [name]: input.label });
        }
    };

    return (
        <AdminLayout>
            <h1 className="py-12 text-4xl border-b border-brand-neutral-100 text-brand-olive-900 font-heading">
                {commitmentId ? 'Edit Commitment' : 'New Commitment'}
            </h1>
            <form onSubmit={handleSubmit} className="pt-8 space-y-12">
                <Input
                    name="title"
                    id="title"
                    label="Title"
                    value={formData.title}
                    onChange={onChange}
                    type="text"
                    required={true}
                />
                <Input
                    name="description"
                    id="description"
                    label="Description"
                    value={formData.description}
                    onChange={onChange}
                    type="text"
                    required={true}
                />
                <Input
                    name="sourcelink"
                    id="sourcelink"
                    label="Source Link"
                    value={formData.sourcelink}
                    onChange={onChange}
                    type="text"
                    required={true}
                />
                <Select
                    label="Commitment Type"
                    name="commitmenttype"
                    value={{
                        value: formData.commitmenttype,
                        label: formData.commitmenttype,
                    }}
                    onChange={onSelectChange}
                    options={[
                        {
                            value: 'Informally Made (updates, quotes, tweets)',
                            label: 'Informally Made (updates, quotes, tweets)',
                        },
                        {
                            value: 'Formally Made (platform)',
                            label: 'Formally Made (platform)',
                        },
                    ]}
                />
                <Select
                    label="Commitment Status"
                    name="commitmentstatus"
                    value={{
                        value: formData.commitmentstatus,
                        label: formData.commitmentstatus,
                    }}
                    onChange={onSelectChange}
                    options={[
                        {
                            value: 'Commitment Made',
                            label: 'Commitment Made',
                        },
                        {
                            value: 'In Policy Deliberation',
                            label: 'In Policy Deliberation',
                        },
                        { value: 'Failed', label: 'Failed' },
                        { value: 'Fulfilled', label: 'Fulfilled' },
                    ]}
                />
                {/* date commitment made */}
                <DatePicker
                    selectedDate={formData.commitmentdate}
                    id="commitmentdate"
                    label="Date Commitment Made"
                    onDateChange={(day) => {
                        setFormData({
                            ...formData,
                            commitmentdate: new Date(day),
                        });
                    }}
                />
                {/* date commitment promised for */}
                <DatePicker
                    selectedDate={formData.commitmentpromiseddate}
                    id="commitmentpromiseddate"
                    label="Date Commitment Promised For"
                    onDateChange={(day) => {
                        setFormData({
                            ...formData,
                            commitmentpromiseddate: new Date(day),
                        });
                    }}
                />
                <DatePicker
                    selectedDate={formData.commitmentmetdate}
                    id="commitmentmetdate"
                    label="Date Commitment Met"
                    onDateChange={(day) => {
                        setFormData({
                            ...formData,
                            commitmentmetdate: new Date(day),
                        });
                    }}
                />
                <Select
                    label="Party Jurisdiction"
                    name="partyjurisdiction"
                    value={{
                        value: formData.partyjurisdiction,
                        label: formData.partyjurisdiction,
                    }}
                    onChange={onSelectChange}
                    options={[
                        {
                            value: 'Federal',
                            label: 'Federal',
                        },
                        { value: 'Provincial', label: 'Provincial' },
                        { value: 'Municipal', label: 'Municipal' },
                    ]}
                />
                <Select
                    label="Party Name"
                    name="partyname"
                    value={{
                        value: formData.partyname,
                        label: formData.partyname,
                    }}
                    onChange={onSelectChange}
                    options={[
                        {
                            value: 'Liberal',
                            label: 'Liberal',
                        },
                        { value: 'Conservative', label: 'Conservative' },
                        { value: 'NDP', label: 'NDP' },
                        { value: 'Green', label: 'Green' },
                        { value: 'Bloc', label: 'Bloc' },
                        { value: 'PPC', label: 'PPC' },
                        { value: 'Other', label: 'Other' },
                    ]}
                />
                {commitmentId && (
                    <div className="flex flex-col">
                        <Button
                            wrapperClassName="self-end"
                            size="sm"
                            disabled={
                                topicInputValue === '' ||
                                topicOptions
                                    .map(({ label }) => label)
                                    .includes(titleCase(topicInputValue.trim()))
                            }
                            onClick={(e) => {
                                handleCreateTopic(e, topicInputValue);
                            }}
                        >
                            Create Topic
                            {topicInputValue !== '' &&
                                `: ${titleCase(topicInputValue.trim())}`}
                        </Button>

                        <Select
                            canCreateOption={true}
                            onCreateOption={(value) => console.log(value)}
                            isClearable={false}
                            label="Topics"
                            name="topics"
                            placeholder="Select Multiple..."
                            onChange={onSelectChange}
                            value={selectedTopics}
                            isMulti
                            options={topicOptions}
                            onInputChange={(value) => {
                                setTopicInputValue(value);
                            }}
                        />
                    </div>
                )}
                <Button className="mt-4" type="submit">
                    {!commitmentId ? 'Submit' : 'Save'}
                </Button>
            </form>
        </AdminLayout>
    );
};

export default AddCommitment;
