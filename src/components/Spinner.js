import React from 'react'
import styled from 'styled-components'

const Spinner = () => {
  return (
    <StyledDiv>
      <div className="loader" />
    </StyledDiv>
  )
}

export default Spinner

// Styled components
const StyledDiv = styled.div`
  padding-bottom: 1em;

  p {
    text-align: center;
  }

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
`
