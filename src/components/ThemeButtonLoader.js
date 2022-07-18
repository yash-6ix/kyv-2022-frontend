import styled from "styled-components";

export const ThemeButtonLoader = () => {
    return (
        <Button>
            <Spinner>
                <div className="loader" />
            </Spinner>
        </Button>
    );
};

const Button = styled.div`
    margin: auto 0;
    background-color: #1f2e53;
    padding: 10px 20px;
    color: white;
    max-width: 200px;
    width: 50%;
`;

const Spinner = styled.div`
    .loader {
        border: 3px solid #f3f3f3; /* Light grey */
        border-top: 3px solid #435ead; /* Blue */
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1.3s linear infinite;
        display: block;
        margin: auto;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
