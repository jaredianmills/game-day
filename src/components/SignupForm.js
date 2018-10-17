import React, { Component } from 'react'
import { connect } from 'react-redux'

class SignupForm extends Component {
  constructor(props) {
    super(props)
      this.state = {
        username: '',
        password: ''
      }
  }

  render() {
    return (
      <h1>hi from signup form</h1>
    )
  }
}

export default SignupForm
