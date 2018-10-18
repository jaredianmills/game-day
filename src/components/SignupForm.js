import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Menu } from 'semantic-ui-react'
import { createUser } from '../actions/userActions'

class LoginForm extends Component {
 constructor(props) {
    super(props)

      this.state = {
        username: '',
        password: ''
      }
  }

  handleChange = (event) => {
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  handleSubmit = () => {
    this.props.createUser(this.state)
  }

  render() {
    return (
    <div style={{width: '50%', marginLeft: '25%', padding: "3%", height: '40%'}}>
      <Menu borderless widths={2}>
        <Menu.Item><h3>Sign Up</h3></Menu.Item>
        <Menu.Item position='right'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input name='username' placeholder='username' value={this.state.username} onChange={this.handleChange}/>
            <Form.Input name='password' type='password' placeholder='password' value={this.state.password} onChange={this.handleChange}/>
            <Button>Submit</Button>
          </Form>
        </Menu.Item>
      </Menu>
  </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    authenticatingUser: state.userReducer.authenticatingUser,
    failedLogin: state.userReducer.failedLogin,
    error: state.userReducer.userError,
    user: state.userReducer.user,
    loggedIn: state.userReducer.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => {dispatch(createUser(user))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
