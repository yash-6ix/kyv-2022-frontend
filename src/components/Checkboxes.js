import React from 'react'
import styled from 'styled-components'

import Checkbox from './Checkbox'

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checkboxes: [
        {
          name: 'math',
          key: 'math',
          label: 'Math'
        },
        {
          name: 'science',
          key: 'science',
          label: 'Science'
        },
        {
          name: 'computer-science',
          key: 'computer-science',
          label: 'Computer Science'
        },
        {
          name: 'french',
          key: 'french',
          label: 'French'
        },
        {
          name: 'english',
          key: 'english',
          label: 'English'
        },
        {
          name: 'geography',
          key: 'geography',
          label: 'Geography'
        },
        {
          name: 'history',
          key: 'history',
          label: 'History'
        },
        {
          name: 'other',
          key: 'other',
          label: 'Other'
        }
      ],
      checkedItems: []
    }
  }

  componentDidMount() {
    // this.setState({
    //   checkboxes: this.props.checkboxes || []
    // })
  }

  handleChange = (e) => {
    const item = e.target.name
    const isChecked = e.target.checked
    console.log(isChecked)

    this.setState(
      (prevState) => ({
        checkedItems: {
          ...prevState.checkedItems,
          [item]: isChecked
        }
      }),
      () => {
        console.log(this.state)
        this.props.updateSubjects(this.state.checkedItems)
      }
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.state.checkboxes.map((item) => (
          <Label key={item.key}>
            {item.label}
            <Checkbox
              name={item.name}
              checked={this.state.checkedItems[item.name]}
              onChange={this.handleChange}
            />
          </Label>
        ))}
      </React.Fragment>
    )
  }
}

export default CheckboxContainer

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: grey;
`
