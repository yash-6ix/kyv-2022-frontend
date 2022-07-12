import React from 'react';

import {
    ResponsesSVG
} from '../../../components/SVG';



const AskTheCandidates = () => {

    return (
        <div className="flex flex-col flex-1 px-20 py-10 overflow-hidden bg-brand-lightBlue">
            <h2 className="text-3xl font-bold font-heading text-brand-olive-900">
                Ask The Candidates
            </h2>
            <hr />
            <p className="font-body">
                Here you can ask questions that will be shared with the candidates, and they'll be able to provide their comment, response, thoughts.
            </p>

            
            <h3 className="text-2xl font-bold mt-16 font-heading text-brand-olive-900">
                Popular Questions
            </h3>
            <hr />

            <div className="flex mt-4">
                <div className="flex p-4 flex-1 mr-2 justify-between rounded flex-col bg-brand-olive-900">
                    <h3 className="text-lg pb-20 font-heading text-white">
                    How would you work towards reconciliation with Indigenous peoples?
                    </h3>

                    <button className="flex mr-auto border-white border-2 rounded bg-transparent text-white">
                        <ResponsesSVG />
                        40 Responses
                    </button>
                </div>

                <div className="flex p-4 flex-1 ml-2 justify-between rounded flex-col bg-brand-olive-900">
                    <h3 className="text-lg pb-20 font-heading text-white">
                    How will you decrease the cost of living for Canadians?
                    </h3>

                    <button className="flex mr-auto border-white border-2 rounded bg-transparent text-white">
                        <ResponsesSVG />
                        23 Responses
                    </button>
                </div>
            </div>

            <div className="flex mt-4">
                <div className="flex p-4 flex-1 justify-between rounded flex-col bg-brand-olive-900">
                    <h3 className="text-lg pb-20 font-heading text-white">
                        How do you plan to address Climate Change?
                    </h3>
                    <button className="flex mr-auto border-white border-2 rounded bg-transparent text-white">
                        <ResponsesSVG />
                        17 Responses
                    </button>
                </div>
            </div>

            
        </div>
    );
};

export default AskTheCandidates;



// const dummyData = [
//     {
//         question: 'How would you work towards reconciliation with Indigenous peoples?',
//         responses: '40',
//     },
//     {
//         question: 'How will you decrease the cost of living for Canadians?',
//         responses: '23',
//     },
//     {
//         question: 'How do you plan to address Climate Change?',
//         responses: '17',
//     }
// ]

