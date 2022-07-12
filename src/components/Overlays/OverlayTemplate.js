import React, { Component } from 'react'
import styled from 'styled-components'

class OverlayTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Main bg={this.props.bg || '#000000bd'} modal={this.props.modal}>
        {this.props.children}
      </Main>
    )
  }
}

export default OverlayTemplate

const Main = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ bg }) => bg};
  z-index: 100;
  display: flex;

  align-items: ${({ modal }) => (modal ? 'center' : 'initial')};
  justify-content: ${({ modal }) => (modal ? 'center' : 'initial')};

  @media (max-width: 700px) {
    flex-direction: ${({ modal }) => (modal ? 'row' : 'column')};
    overflow-y: scroll;
  }

  @media (min-width: 701px) {
    background-color: #0000005c;
    justify-content: center;
    align-items: center;
  }
`
