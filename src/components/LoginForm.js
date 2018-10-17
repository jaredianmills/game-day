import React, { Component } from 'react'
import { connect } from 'react-redux'

class LoginForm extends Component {
 constructor(props) {
    super(props)

      this.state = {
        username: '',
        password: ''
      }  
  }

  render() {
    return (
      <h1>hi from login form</h1>
    )
  }

}

export default LoginForm
