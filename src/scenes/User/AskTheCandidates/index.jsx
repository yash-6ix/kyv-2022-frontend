import React, { Component } from 'react';
import { toast } from 'react-toastify';

import Input from '../../../components/Input';
// import {
//     ResponsesSVG
// } from '../../../components/SVG';
import http from '../../../services/httpService';

class AskTheCandidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newQuestion: '',
        };
    }

    updateValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitNewQuestion = async () => {
        const { newQuestion } = this.state;
        if (newQuestion.length === 0) {
            toast.error('Please enter a question to ask the Candidates.');
            return;
        }

        const response = await http.post(`/api/candidates/question`, {
            question: newQuestion,
        });
        console.log(response);

        this.setState({
            newQuestion: '',
        });
        toast.success(
            'Your question has been submit successfull. We will notify you when Candidates share their answers.'
        );
    };

    render() {
        return (
            <div className="flex flex-col flex-1 px-8 py-10 overflow-hidden sm:px-20 bg-brand-lightBlue">
                <h2 className="text-3xl font-bold font-heading text-brand-olive-900">
                    Ask The Candidates
                </h2>
                <hr />
                <p className="font-body">
                    Here you can ask questions that will be shared with the
                    candidates, and they'll be able to provide their comment,
                    response, thoughts.
                </p>
                <div className="flex flex-col px-6 pt-2 mt-2 bg-white border-2 rounded border-brand-olive-800">
                    <Input
                        name="newQuestion"
                        id="newQuestion"
                        label="Enter your question here..."
                        type="text"
                        value={this.state.newQuestion}
                        onChange={this.updateValue}
                    />

                    <button
                        onClick={this.submitNewQuestion}
                        className="px-8 py-1 mb-4 ml-auto mr-auto text-sm text-white bg-black rounded rounded-full font-body"
                    >
                        Submit
                    </button>
                </div>

                <h3 className="mt-16 text-2xl font-bold text-center font-heading text-brand-olive-900">
                    No Questions have been answered by Candidates yet!
                </h3>

                {/* <h3 className="mt-16 text-2xl font-bold font-heading text-brand-olive-900">
                    Popular Questions
                </h3>
                <hr />

                <div className="flex mt-4">
                    <div className="flex flex-col justify-between flex-1 p-4 mr-2 rounded bg-brand-olive-900">
                        <h3 className="pb-20 text-lg text-white font-heading">
                        How would you work towards reconciliation with Indigenous peoples?
                        </h3>

                        <button className="flex mr-auto text-white bg-transparent border-2 border-white rounded">
                            <ResponsesSVG />
                            40 Responses
                        </button>
                    </div>

                    <div className="flex flex-col justify-between flex-1 p-4 ml-2 rounded bg-brand-olive-900">
                        <h3 className="pb-20 text-lg text-white font-heading">
                        How will you decrease the cost of living for Canadians?
                        </h3>

                        <button className="flex mr-auto text-white bg-transparent border-2 border-white rounded">
                            <ResponsesSVG />
                            23 Responses
                        </button>
                    </div>
                </div>

                <div className="flex mt-4">
                    <div className="flex flex-col justify-between flex-1 p-4 rounded bg-brand-olive-900">
                        <h3 className="pb-20 text-lg text-white font-heading">
                            How do you plan to address Climate Change?
                        </h3>
                        <button className="flex mr-auto text-white bg-transparent border-2 border-white rounded">
                            <ResponsesSVG />
                            17 Responses
                        </button>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default AskTheCandidates;
