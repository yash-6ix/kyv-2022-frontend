import React, { Component } from 'react'
import styled from 'styled-components'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Main>
        <Inner mobileFullWidth={this.props.mobileFullWidth || false}>
          {this.props.children}
        </Inner>
      </Main>
    )
  }
}

export default Modal

const Main = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Inner = styled.div`
  width: ${({ mobileFullWidth }) => (mobileFullWidth ? '100%' : '80%')};
  max-width: 800px;
  background-color: white;
`
