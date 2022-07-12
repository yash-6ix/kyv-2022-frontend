import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import clientService from "../../../../services/clients/clientsService"
import { storage } from "../../../../firebase";
import Loader from "react-loader-spinner";

class NewClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imgLoading: false,
            imgAsUrl: ''
        };
    }

    onChange = (key, value) => {
        this.setState({
            [key]: value,
        });
    };
    handleImageAsFile = (e) => {
        const image = e.target.files[0];
        this.setState({ imgLoading: true })
        if (image === "") {
            console.error(`not an image, the image file is a ${typeof image}`);
        }
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapShot) => { },
            (err) => {
                console.log("error in Image upload", err);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(async (fireBaseUrl) => {
                        this.setState({ imgAsUrl: fireBaseUrl, imgLoading: false })
                    });
            }
        );
    };
    handleSubmit = async (event) => {

        event.preventDefault();
        const { name, imgAsUrl } = this.state;
        const response = await clientService.createClient({ name: name, logo: imgAsUrl });
        if (!response.apierror) {
            toast.success('Client created successfullly.');
        } else {
            toast.error(response.apierror);
        }
        this.props.history.push("/admin/dashboard")
    };

    render() {
        const { name, imgAsUrl, imgLoading } = this.state;
        return (
            <div className="flex flex-col items-center flex-1 bg-brand-neutral-25">
                <main className="flex flex-col w-full max-w-5xl p-6 px-24">
                    <h1 className="py-8 font-heading text-4xl">New Client</h1>

                    <form onSubmit={this.handleSubmit}>
                        <Label>Name</Label>
                        <Input
                            // required={true}
                            placeholder="Enter name here"
                            value={name}
                            onChange={(e) =>
                                this.onChange('name', e.target.value)
                            }
                        />
                        {imgLoading &&
                            <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} />
                        }
                        {imgAsUrl &&
                            <div style={{ width: 200, height: 180 }}>
                                <img src={imgAsUrl} alt="logo" />
                            </div>
                        }
                        <Input
                            type="file"
                            id="imgUrl"
                            required={true}
                            label="Upload Img"
                            onChange={(val) => this.handleImageAsFile(val)}
                        />
                        {/* <Label onClick={this.handleSubmit}>Submit</Label> */}
                        <button
                            type="submit" value="Submit"
                            disabled={imgLoading}
                            className={`w-full py-2 text-lg font-bold transition bg-brand-olive-900 active:bg-brand-olive-700 font-body text-brand-white rounded-xl ${imgLoading ? '' : 'hover:bg-brand-olive-800'}`}
                        >
                            Submit
                        </button>
                    </form>
                </main>
            </div>
        );
    }
}

export default NewClient;

const Label = styled.p`
    font-weight: 600;
`;

const Input = styled.input`
    border: 1px solid blue;
    background: transparent;
    font-size: 16px;
    padding: 8px;
    width: 100%;
    border-radius: 3px;
    margin-bottom: 10px;
    font-family: 'Raleway', sans-serif;

    ::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: #bbb;
        font-family: 'Raleway', sans-serif;
    }
`;

// const Textarea = styled.textarea`
//     border: 1px solid blue;
//     background: transparent;
//     font-size: 16px;
//     padding: 8px;
//     border-radius: 3px;
//     width: 100%
//     margin-bottom: 10px;
//     font-family: 'Raleway', sans-serif;
// `;
