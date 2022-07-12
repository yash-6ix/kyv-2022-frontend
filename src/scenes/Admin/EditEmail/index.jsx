import { useParams } from "react-router";
import { useHistory } from "react-router";
// import { ArrowSVG, CloseSVG, MinusSVG, PlusSVG } from "../../../components/SVG";
import { useEffect, useState, useCallback } from "react";
import emailsService from "../../../services/emails/emailsService";
import updatesService from "../../../services/updates/updatesService";
import { useQuery } from "../../../hooks/useQuery";
import { AdminLayout } from "../AdminLayout";
import { toast } from "react-toastify";
// import Toggle from "react-toggle";
import ReactQuill from 'react-quill';
import { storage } from "../../../firebase";
import Loader from "react-loader-spinner";
import DragNDrop from "./DragNDrop";
import DateTimePicker from "react-datetime-picker";
const EditEmail = () => {
    // eslint-disable-next-line
    const [loading, setLoading] = useState(true);
    const { clientId } = useParams();
    const query = useQuery();
    const emailId = query.get("emailId");
    const history = useHistory();
    const [value, onChange] = useState(new Date());
    const [createCampaign, setCreateCampaign] = useState(false);
    const [scheduleEmailDatePicker, setScheduleEmailDatePicker] = useState(false);
    const [schedule, setSchedule] = useState();
    // eslint-disable-next-line
    const [updates, setUpdates] = useState(new Array(1).fill(0));
    // eslint-disable-next-line
    const [emailUpdateTypes, setEmailUpdateTypes] = useState([]);
    // eslint-disable-next-line
    const [emailSections, setEmailSections] = useState([]);
    const [emailName, setEmailName] = useState("");
    const [emailPreview, setEmailPreview] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailTopBody, setEmailTopBody] = useState("");
    const [emailTopBody2, setEmailTopBody2] = useState("");
    // const [emailImg, setEmailImg] = useState('');
    const [emailRecipients, setEmailRecipients] = useState("");
    const [imageAsUrl, setImageAsUrl] = useState("");
    const [loadingImg, setLoadingImg] = useState(false);

    const load = useCallback(async () => {
        if (emailId) {
            const updates = await updatesService.fetchUpdates();

            //Set Image
            setLoadingImg(true);
            const email = await emailsService.getEmail(emailId);

            // Email headers
            setEmailName(email.name);
            setEmailPreview(email.preview);
            setEmailSubject(email.subject);
            setEmailTopBody(email.topbody);
            setEmailTopBody2(email.topbody2);
            setImageAsUrl(email.img || "");
            setLoadingImg(false);

            // All updates
            setUpdates(updates);

            // Email sections
            setEmailSections(email.sections);

            setEmailUpdateTypes(email.updatetypes);
        }
    }, [emailId]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await load();
            setLoading(false);
        })();
    }, [load]);

    const onClickSave = async (e) => {
        e.preventDefault();
        if (emailName === "" || emailSubject === "") {
            alert('Please enter a name and subject for the email.')
            return
        }
        const result = await emailsService.createEmail(
            emailName,
            emailSubject,
            emailPreview,
            emailTopBody,
            emailTopBody2,
            imageAsUrl,
            clientId
        );
        console.log(result);
        const { _id } = result;
        history.push(`/admin/client/${clientId}/edit-email?emailId=${_id}`);
    };

    const handleImageAsFile = (e) => {
        setLoadingImg(true);
        const image = e.target.files[0];
        // setImageAsFile(imageFile => (image))
        if (image === "") {
            console.error(`not an image, the image file is a ${typeof image}`);
        }
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapShot) => {
                console.log(snapShot);
            },
            (err) => {
                console.log("error in Image upload", err);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(async (fireBaseUrl) => {
                        setImageAsUrl(fireBaseUrl);
                        setLoadingImg(false);
                    });
            }
        );
    };
    const [setEmailLoading] = useState(false);
    const [testEmailLoading, setTestEmailLoading] = useState(false);
    const [emailCampaignLoading, setEmailCampaignLoading] = useState(false);

    const validateEmail = (email) => {
        const re =
            // eslint-disable-next-line
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // Sending test email
    const onClickSendTestEmail = async (e) => {
        e.preventDefault();
        setTestEmailLoading(true);
        let emails =
            emailRecipients && emailRecipients.length > 0
                ? emailRecipients.split(",").map((email) => {
                    return email.trim();
                })
                : [];
        // eslint-disable-next-line
        if (emails.length == 0) {
            toast.error("Please enter atleast one email to send test emails");
            setTestEmailLoading(false);
            return;
        } else {
            let emailsNotValid = emails.find((email) => !validateEmail(email));
            if (emailsNotValid) {
                toast.error("All the emails you entered are not valid");
                setTestEmailLoading(false);
                return;
            }
        }
        await emailsService.sendTestEmail(emailId, "test", { emails });
        setTestEmailLoading(false);
    };

    // Sending production email
    // eslint-disable-next-line
    const onClickSendProdEmail = async (e) => {
        e.preventDefault();
        setEmailLoading(true);
        await emailsService.sendTestEmail(emailId, "prod");
        setEmailLoading(false);
    };

    const createAndScheduleCampaign = async (e) => {
        setEmailCampaignLoading(true);
        let data = {
            emailid: emailId,
            scheduled: e.scheduled,
            scheduledAt: e.scheduledAt,
        };
        await emailsService.sendEmailCampaign(data);
        setEmailCampaignLoading(false);
    };

    const sendCampaign = (isScheduled) => {
        setScheduleEmailDatePicker(isScheduled);
        setSchedule(isScheduled);
    };

    const onEditEmail = async (e) => {
        e.preventDefault();
        if (emailName === "") return;
        let data = {
            name: emailName,
            subject: emailSubject,
            preview: emailPreview,
            topbody: emailTopBody,
            topbody2: emailTopBody2,
        }
        const result = await emailsService.updateEmail(emailId, data);
        const { _id } = result;
        if (_id)
            toast.success("Email updated successfuly")
        else
            toast.error("Email updation failed!")
        history.push(`/admin/client/${clientId}/edit-email?emailId=${_id}`);
    }

    return (
        <AdminLayout>
            <h1 className="py-12 text-4xl border-b border-brand-neutral-100 text-brand-olive-900 font-heading">
                {emailId ? "Edit Email" : "New Email"}
            </h1>
            <form>
                <div className="flex flex-col pb-4 mt-2 space-y-2 border-b border-brand-neutral-100">
                    <Input
                        type="text"
                        id="email-name"
                        required={true}
                        label="Email Campaign Name (required)"
                        onChange={(e) => setEmailName(e.target.value)}
                        value={emailName}
                    // disabled={emailId ? true : false}
                    />
                    <Input
                        type="text"
                        id="email-subject"
                        required={true}
                        label="Email Subject Line (required)"
                        onChange={(e) => setEmailSubject(e.target.value)}
                        value={emailSubject}
                    // disabled={emailId ? true : false}
                    />
                    <Input
                        type="text"
                        id="email-preview"
                        required={true}
                        label="Email Preview Line"
                        onChange={(e) => setEmailPreview(e.target.value)}
                        value={emailPreview}
                    // disabled={emailId ? true : false}
                    />
                    {/* <Input
                        type="text"
                        id="email-top-body"
                        required={true}
                        label="Email Top Body"
                        onChange={(e) => setEmailTopBody(e.target.value)}
                        value={emailTopBody}
                        disabled={emailId ? true : false}
                    /> */}
                    <div>
                        <label className="text-sm text-brand-neutral-400 ">
                            Email Top Body
                        </label>
                        <ReactQuill
                            theme={'snow'}
                            defaultValue=""
                            value={emailTopBody}
                            onChange={(value) => setEmailTopBody(value)}
                            modules={EditEmail.modules}
                            formats={EditEmail.formats}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-brand-neutral-400 ">
                            Email Top Body 2
                        </label>
                        <ReactQuill
                            theme={'snow'}
                            defaultValue=""
                            value={emailTopBody2}
                            onChange={(value) => setEmailTopBody2(value)}
                            modules={EditEmail.modules}
                            formats={EditEmail.formats}
                        />
                    </div>
                    {!emailId && (
                        <Input
                            type="file"
                            id="imgUrl"
                            required={true}
                            label="Upload Img"
                            onChange={handleImageAsFile}
                        />
                    )}
                    {loadingImg && (
                        <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} />
                    )}
                    {!loadingImg && imageAsUrl && (
                        <img src={imageAsUrl} alt="img" style={{ width: 150, height: 150 }} />
                    )}
                    {emailId && (
                        <div>
                            <Button style={{ marginRight: "10px" }} onClick={onEditEmail}>
                                Update
                            </Button>
                        </div>
                    )}
                    {emailId && (
                        <Input
                            type="text"
                            id="email-subject"
                            label="Recipients ( Send Test Email )"
                            placeholder="For Sending Test Email ( separated by commas )"
                            onChange={(e) => setEmailRecipients(e.target.value)}
                            value={emailRecipients}
                        />
                    )}
                    {!emailId && (
                        <div className="self-start">
                            <Button disabled={loadingImg} onClick={onClickSave}>Create</Button>
                        </div>
                    )}
                    {emailId && (
                        <div className="self-start" style={{ display: "flex" }}>
                            <Button style={{ marginRight: "10px" }} onClick={onClickSendTestEmail}>
                                {testEmailLoading ? (
                                    <div className="border-b-2 rounded-full w-7 h-7 border-brand-white spin"></div>
                                ) : (
                                    "Send Test Email"
                                )}
                            </Button>
                            {/* <Button onClick={onClickSendProdEmail}>
                                {emailLoading ? (
                                    <div className="border-b-2 rounded-full w-7 h-7 border-brand-white spin"></div>
                                ) : (
                                    "Send Email"
                                )}
                            </Button> */}
                            <Button
                                style={{ marginLeft: "10px" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCreateCampaign(createCampaign ? false : true);
                                }}
                            >
                                Create Campaign
                            </Button>
                        </div>
                    )}
                    {createCampaign && (
                        <div style={{ display: "flex", flexDirection: "column", margin: "15px 0" }}>
                            <div style={{ width: "30%" }}>
                                <div>
                                    <input
                                        style={{ margin: "0 10px" }}
                                        type="radio"
                                        name="schedule"
                                        value="false"
                                        onChange={() => sendCampaign(false)}
                                    />
                                    <label>Create and Send Campaign</label>
                                </div>
                                <div>
                                    <input
                                        style={{ margin: "0 10px" }}
                                        type="radio"
                                        name="schedule"
                                        value="true"
                                        onChange={() => sendCampaign(true)}
                                    />
                                    <label>Create and Schedule Campaign</label>
                                </div>
                            </div>
                        </div>
                    )}
                    {scheduleEmailDatePicker && (
                        <div style={{ marginBottom: "15px" }}>
                            <DateTimePicker onChange={(e) => onChange(e)} value={value} />
                        </div>
                    )}
                    {createCampaign && (
                        <div>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    createAndScheduleCampaign({
                                        scheduled: schedule,
                                        scheduledAt: schedule ? value : undefined,
                                    });
                                }}
                            >
                                {emailCampaignLoading ? (
                                    <div className="border-b-2 rounded-full w-7 h-7 border-brand-white spin"></div>
                                ) : (
                                    "Save Campaign"
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </form>
            {emailId && (
                <div className="mt-4">
                    <DragNDrop emailId={emailId} />
                </div>
            )}
        </AdminLayout>
    );
};

const Button = ({ children, onClick, style = {} }) => {
    return (
        <button
            style={style}
            onClick={onClick}
            className="flex flex-row items-center px-6 py-3 text-xl font-bold transform border-b-4 rounded-lg border-brand-bronze-500 text-brand-white bg-brand-olive-900 font-heading hover:bg-brand-olive-800 hover:scale-105 active:scale-100"
        >
            {children}
        </button>
    );
};

const hasOutline =
    "focus-visible:ring-2 ring-brand-olive-900 focus:outline-none focus-visible:ring-brand-olive-900 ";

const Input = ({ type, id, label, placeholder, onChange, value, disabled, required }) => {
    return (
        <div className="flex flex-col flex-1">
            <InputLabel id={id}>{label}</InputLabel>
            <input
                onChange={onChange}
                className={`px-6 py-4 rounded-lg font-heading text-brand-olive-900 ${disabled ? "bg-brand-neutral-25" : "bg-brand-white"
                    } tracking-wide ${hasOutline} shadow-lg`}
                type={type}
                value={value}
                required={required}
                id={id}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
};

const InputLabel = ({ id, children }) => {
    return (
        <label
            htmlFor={id}
            className="inline-block mb-1 text-xl font-bold font-heading text-brand-olive-900"
        >
            {children}
        </label>
    );
};

EditEmail.modules = {
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
EditEmail.formats = [
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

export default EditEmail;
