import React, { Component } from 'react'

import { connect } from 'react-redux'
import { showAnOverlay } from '../../redux/actions'

class Overlays extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let o = this.props.overlay

    switch (o && o.type ? o.type : true) {
      case 'first-modal':
        return <p>test</p>

      default:
        return null
    }
  }
}

const mapStateToProps = (state) => {
  let stateBuilder = {}
  if (state.auth.overlay !== undefined) stateBuilder.auth.overlay = state.overlay

  return stateBuilder
}

const mapDispatchToProps = (dispatch) => {
  return {
    // Returns a promise
    showAnOverlay: () => dispatch(showAnOverlay()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlays)
