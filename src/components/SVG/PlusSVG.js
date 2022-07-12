import * as React from 'react';

export const PlusSVG = (props) => {
    return (
        <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M7 1a1 1 0 012 0v14a1 1 0 11-2 0V1z" />
            <path d="M15 7a1 1 0 110 2H1a1 1 0 010-2h14z" />
        </svg>
    );
};
