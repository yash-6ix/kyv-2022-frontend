import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import config from '../config/config'
import closeIcon from "../assets/close-dark.png" 

class MobileMenuBtns extends Component {
  logout = () => {
    localStorage.removeItem(config.localStorageVariables.email)
    localStorage.removeItem(config.localStorageVariables.password)
    window.location.reload(true)
  }

  render() {
    return (
      <Main>
        <Row1>
          {/* <Logo src={require('../assets/logos/everysay-wide-logo-bw.png')} /> */}
          <CloseBtn
            onClick={this.props.close}
            src={closeIcon}
          ></CloseBtn>
        </Row1>
        <br></br>

        <ItemLink href="https://about.c" target="_blank">
          About
        </ItemLink>
        {localStorage.getItem(config.localStorageVariables.email) ? (
          <Item onClick={this.logout} to="/">
            Logout
          </Item>
        ) : null}

        {/* <Item onClick={this.props.close} to="/terms-and-conditions">
          Terms & Conditions
        </Item> */}
        {/* <Item onClick={this.props.close} href="/#process">
          Process
        </Item>
        <Item onClick={this.props.close} href="/#offerings">
          Our Offerings
        </Item>
        <Item onClick={this.props.close} href="/#everysay">
          Featured Product
        </Item>
        <Item onClick={this.props.close} href="/#team">
          Team
        </Item> */}
      </Main>
    )
  }
}

export default MobileMenuBtns

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  height: 100vh;
  min-height: 600px;
  border-left: 1px solid #bbb;

  @media (min-width: 701px) {
    background: #ececec;
    border-left: 2px solid #bbb;

    padding-left: 50px;
    padding-top: 50px;
    padding-right: 50px;
  }
`

const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`

const CloseBtn = styled.img`
  width: 17px;
  height: 17px;
  opacity: 0.7;

  @media (min-width: 701px) {
    width: 27px;
    height: 27px;
    opacity: 0.6;
  }
`

const Item = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  margin-bottom: 10px;
  cursor: pointer;
`

const ItemLink = styled.a`
  text-decoration: none;
  margin-bottom: 10px;
  cursor: pointer;
`
