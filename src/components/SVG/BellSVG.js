import * as React from 'react';

export const BellSVG = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 416 416"
            {...props}
        >
            <path d="M208 416c23.573 0 42.667-19.093 42.667-42.667h-85.333C165.333 396.907 184.427 416 208 416zM336 288V181.333c0-65.6-34.88-120.32-96-134.827V32c0-17.707-14.293-32-32-32s-32 14.293-32 32v14.507c-61.12 14.507-96 69.227-96 134.827V288l-42.667 42.667V352h341.333v-21.333L336 288z" />
        </svg>
    );
};
