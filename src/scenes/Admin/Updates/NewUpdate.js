import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UpdatesService from '../../../services/updates/updatesService';
import topicsService from '../../../services/topics/topicsService';
import { Button } from '../../../components/Button';
import { useHistory } from 'react-router';
import { useQuery } from '../../../hooks/useQuery';
import { AdminLayout } from '../AdminLayout';
import Input from '../../../components/Input';
import Select from '../../../components/Select/Select';
// import BubbleMultiSelect from '../../../components/BubbleMultiSelect';
import updatesService from '../../../services/updates/updatesService';
import { slugCase, titleCase } from '../../../util/stringUtils';
import ReactQuill from 'react-quill';
import { CloseSVG } from '../../../components/SVG';
import { storage } from "../../../firebase"
import Loader from "react-loader-spinner";
const NewUpdate = () => {
    const history = useHistory();
    const query = useQuery();
    const updateId = query.get('updateId');
    const [description, setDescription] = useState('');
    const [fullarticle, setFullarticle] = useState('');
    const [sourceUrl, SetSourceUrl] = useState([]);
    const [emailImg, setEmailImg] = useState('');
    const [loadingImg, setLoadingImg] = useState(false);
    const [archiveConfirm, setArchiveConfirm] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        sourceurl: '',
        internalnote: '',
        imgcaption: '',
        type: '',
        topics: [],
    });
    const [allTopics, setAllTopics] = useState([]);

    useEffect(() => {
        (async () => {
            if (!updateId) return; //no need to fetch, not editing
            const update = await updatesService.fetchUpdateById(updateId);

            await loadAllTopics();

            if (!update) return; //commitment not found
            setDescription(update.description || '');
            setFullarticle(update.fullarticle || '');
            setFormData({
                title: update.title || '',
                // sourceurl: update.sourceurl || '',
                internalnote: update.internalnote || '',
                imgcaption: update.imgcaption || '',
                type: update.type || '',
                topics: update.topics || [],
            });
            setEmailImg(update.img || '')
            SetSourceUrl(update.sourceurl || [])
        })();
    }, [updateId]);

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

        console.log(description);
        if (!updateId) {
            const response = await UpdatesService.createUpdate({
                title: formData.title,
                description: description,
                fullarticle: fullarticle,
                sourceurl: sourceUrl,
                img: emailImg ? emailImg : undefined,
                internalnote: formData.internalnote,
                imgcaption: formData.imgcaption,
                type: formData.type,
            });
            if (!response.apierror) {
                toast.success('Update created successfullly.');
                history.push(`/admin/updates`);
            } else {
                toast.error(response.apierror);
            }
            return;
        }
        const response = await UpdatesService.putUpdate(updateId, {
            title: formData.title,
            description: description,
            fullarticle: fullarticle,
            sourceurl: sourceUrl,
            img: emailImg ? emailImg : undefined,
            internalnote: formData.internalnote,
            imgcaption: formData.imgcaption,
            type: formData.type,
        });
        if (!response.apierror) {
            toast.success('Update modified successfullly.');
            history.push(`/admin/updates`);
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
        if (name === 'type') {
            setFormData({ ...formData, type: input.label });
        } else if (name === 'topics') {
            if (action === 'select-option') {
                const newSelectedTopicIds = selectedTopics
                    .slice()
                    .map(({ value }) => value);

                newSelectedTopicIds.push(option.value);

                setFormData({ ...formData, topics: newSelectedTopicIds });
                updatesService.addTopic(updateId, option.value);
            } else if (action === 'remove-value') {
                const newSelectedTopicsIds = selectedTopics
                    .slice()
                    .map(({ value }) => value);
                const removeIndex = newSelectedTopicsIds.findIndex(
                    (topicId) => topicId === removedValue.value
                );
                newSelectedTopicsIds.splice(removeIndex, 1);
                setFormData({ ...formData, topics: newSelectedTopicsIds });
                updatesService.removeTopic(updateId, removedValue.value);
            }
        }
    };

    const [topicInputValue, setTopicInputValue] = useState('');
    const handleUrlValidator = (e) => {
        e.preventDefault()
        const URL = e.target.value.trim()
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        if (!!pattern.test(URL))
            SetSourceUrl(sourceUrl => [...sourceUrl, URL]);
        else
            toast.error("Please enter a valid sourceurl");
        setFormData({ ...formData, sourceurl: '' });
    }
    const deleteSourceurl = (val) => {
        sourceUrl.splice(val, 1);
        SetSourceUrl(sourceUrl => [...sourceUrl]);
    }
    const handleImageAsFile = (e) => {
        setLoadingImg(true)
        const image = e.target.files[0]
        // setImageAsFile(imageFile => (image))
        if (image === '') {
            console.error(`not an image, the image file is a ${typeof (image)}`)
        }
        const uploadTask = storage.ref(`/images/${image.name}`).put(image)
        uploadTask.on('state_changed',
            (snapShot) => {
                console.log(snapShot)
            }, (err) => {
                console.log("error in Image upload", err)
            }, () => {
                storage.ref('images').child(image.name).getDownloadURL()
                    .then(async fireBaseUrl => {
                        setEmailImg(fireBaseUrl)
                        setLoadingImg(false)
                    })
            }
        )
    }
    const handleArchiveClickOpen = () => {
        setArchiveConfirm(true)
    }
    const handleArchiveClickClose = () => {
        setArchiveConfirm(false)
    }
    const handleArchiveClickConfirm = async () => {
        console.log(updateId)
        const response = await UpdatesService.deleteUpdate(updateId);
        if (!response.apierror) {
            toast.success('Update deleted successfullly.');
            history.push(`/admin/updates`);
        } else {
            toast.error(response.apierror);
        }
        return;
    }

    return (
        <AdminLayout>
            <div className="flex justify-between">
                <h1 className="py-12 text-4xl border-b border-brand-neutral-100 text-brand-olive-900 font-heading">
                    {updateId ? 'Edit Update' : 'New Update'}
                </h1>

                {
                    !archiveConfirm ? 
                    <div className='flex flex-col mt-12'>
                        <Button className="mt-12" onClick={() => handleArchiveClickOpen()}>Archive</Button>
                    </div>
                    :
                    <div className='flex flex-col mt-12'>
                        <button className="bg-black text-white rounded-md p-3" onClick={() => handleArchiveClickConfirm()}>Confirm</button>
                        <button className="bg-gray-300 text-white rounded p-1 text-xs mt-1" onClick={() => handleArchiveClickClose()}>Cancel</button>
                    </div>
                }
            </div>
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
                <div>
                    <label className="text-sm text-brand-neutral-400">
                        Description (What will be shown in the email to the client)
                    </label>
                    <ReactQuill
                        theme={'snow'}
                        name="description"
                        defaultValue=""
                        value={description}
                        onChange={(value) => setDescription(value)}
                        modules={NewUpdate.modules}
                        formats={NewUpdate.formats}
                    />
                </div>
                <div>
                    <label className="text-sm text-brand-neutral-400 ">
                        Full Article (What will be shown on the webpage for this update)
                    </label>
                    <ReactQuill
                        theme={'snow'}
                        name="fullarticle"
                        defaultValue=""
                        // onChange={this.handleChange}
                        // value={this.state.editorHtml}
                        value={fullarticle}
                        onChange={(value) => setFullarticle(value)}
                        modules={NewUpdate.modules}
                        formats={NewUpdate.formats}
                    />
                </div>
                <Input
                    type="file"
                    id="imgUrl"
                    label="Upload Img"
                    onChange={handleImageAsFile}
                />
                {loadingImg && <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} />}
                {!loadingImg && emailImg && (<>
                    {/* //styles ethe hi deda   oh ta koini phla demo poora krdo baad ch add kr deyo ok          */}
                    <label>Uploaded Image</label>
                    <img src={emailImg} alt="img" style={{ width: 150, height: 150 }} />
                </>)}
                <Input
                    name="imgcaption"
                    id="imgcaption"
                    label="Image Caption"
                    value={formData.imgcaption}
                    onChange={onChange}
                    type="text"
                    required={false}
                />
                <Input
                    name="sourceurl"
                    id="sourceurl"
                    label="Source URL"
                    value={formData.sourceurl}
                    onChange={onChange}
                    type="text"
                    onKeyDown={e => { e.key === 'Enter' && handleUrlValidator(e) }}
                // required={!(sourceUrl && sourceUrl.length > 0)}
                />
                {sourceUrl && sourceUrl.map((ele, idx) => {
                    return (
                        <div style={{
                            position: "relative",
                        }}>
                            <Input
                                value={idx + 1 + ") " + ele}
                                id={ele}
                                readOnly
                                type="text"
                            />
                            <button style={{
                                position: 'absolute',
                                top: "8px",
                                right: '30px',
                                width: '10px',
                                height: '10px',
                            }} onClick={() => deleteSourceurl(idx)} >
                                <CloseSVG />
                            </button>
                        </div>)
                })}
                <Select
                    label="Type"
                    name="type"
                    value={{
                        value: formData.type,
                        label: formData.type,
                    }}
                    onChange={onSelectChange}
                    options={[
                        { value: 'News Article', label: 'News Article' },
                        { value: 'Press Release', label: 'Press Release' },
                        { value: 'Blog', label: 'Blog' },
                        { value: 'Tweet', label: 'Tweet' },
                    ]}
                />
                <Input
                    name="internalnote"
                    id="internalnote"
                    label="Internal Note"
                    value={formData.internalnote}
                    onChange={onChange}
                    type="text"
                />

                {updateId && (
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
                            isClearable={false}
                            label="Topics"
                            name="topics"
                            placeholder="Select Multiple..."
                            onChange={onSelectChange}
                            onInputChange={(value) => {
                                setTopicInputValue(value);
                            }}
                            value={selectedTopics}
                            isMulti
                            options={topicOptions}
                        />
                    </div>
                )}

                {/* <Label onClick={this.handleSubmit}>Submit</Label> */}
                <Button className="mt-4" type="submit">
                    {!updateId ? 'Submit' : 'Save'}
                </Button>
            </form>
        </AdminLayout>
    );
};

NewUpdate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};
NewUpdate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

export default NewUpdate;
