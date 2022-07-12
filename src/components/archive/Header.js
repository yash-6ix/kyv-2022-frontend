import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { showAnOverlay } from '../../store/actions/authAction'
import menuIcon from "../assets/menu-new-white.png";
import MobileMenuBtns from '../MobileMenuBtns'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollytop: false,
      mobileCloseBuffer: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  // onScroll = (e) => {
  //   if (window.scrollY > 20) {
  //     this.setState({
  //       scrollytop: true
  //     })
  //   } else {
  //     this.setState({
  //       scrollytop: false
  //     })
  //   }
  // }

  handleClick = () => {
    const wrapper = document.getElementById('wrapper')
    wrapper.classList.toggle('is-nav-open')
    this.setState({
      mobileCloseBuffer: !this.state.mobileCloseBuffer,
    })
  }

  render() {
    return (
      <Main>
        <MobileAfterScroll>
          <Left>
            <Logo to={'/'}>
              <LogoText scroll={true}>LOGO HERE</LogoText>
            </Logo>
          </Left>

          <Right>
            <HeaderRight>
              <MenuBtn
                src={menuIcon}
                onClick={this.handleClick}
              />
            </HeaderRight>
          </Right>
        </MobileAfterScroll>

        <MobileMenu id="wrapper">
          <MobileMenuBtns
            loggedIn={this.props.userToken}
            overlay={this.props.showAnOverlay}
            close={this.handleClick}
          />
        </MobileMenu>

        {this.state.mobileCloseBuffer ? (
          <MobileCloseBuffer onClick={this.handleClick} />
        ) : null}
      </Main>
    )
  }
}

const mapStateToProps = (state) => {
  let stateBuilder = {}
  if (state.auth.userToken) stateBuilder.userToken = state.auth.userToken

  return stateBuilder
}

const mapDispatchToProps = (dispatch) => {
  return {
    // Returns a promise
    showAnOverlay: (type, data) => dispatch(showAnOverlay(type, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

const Main = styled.div`
  z-index: 5;
  top: 0;
  left: 0;

  .is-nav-open {
    margin-right: 0;
  }
`

const MobileAfterScroll = styled.div`
  position: fixed;
  top: 5%;
  left: 5%;
  width: 90%;
  /* padding: 15px; */
  /* margin: 15px 5%; */
  background-color: ${({ bg }) => (bg ? '#ffffff96' : 'none')};
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 700px) {
    padding: 10px 10px;
    width: calc(90% - 20px);
    top: 20px;
  }
`

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 15;
  height: 100vh;
  min-height: 600px;
  width: 60%;
  transition: margin-right ease-in-out 0.5s, display ease 0.5s;
  margin-right: -60%;

  @media (min-width: 701px) {
    width: 400px;
    margin-right: -400px;
  }
`

const MobileCloseBuffer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  width: calc(100% - 400px);
  height: 100vh;
  min-height: 600px;
  background-color: transparent;

  @media (max-width: 700px) {
    width: 40%;
  }
`

const Left = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled(Link)`
  text-decoration: none;
  /* margin-top: 25px; */
  display: flex;
  align-items: flex-end;
`

const LogoText = styled.p`
  font-size: 26px;
  color: white;
  margin: 0;
  font-family: 'Raleway', serif;

  @media (max-width: 700px) {
    font-size: 24px;
  }

  @media (max-width: 400px) {
    font-size: 20px;
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderRight = styled.div`
  display: flex;
`

const MenuBtn = styled.img`
  width: 30px;
  height: 22px;
  margin-left: 10px;
  cursor: pointer;
`
