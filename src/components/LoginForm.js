import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Menu } from 'semantic-ui-react'
import { loginUser } from '../actions/userActions'

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
    this.props.loginUser(this.state)
  }

  render() {
    console.log(this.props);
    return (
    <Menu borderless style={{width: '30%', marginLeft: '20%', padding: "3%"}}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input name='username' placeholder='username' value={this.state.username} onChange={this.handleChange}/>
          <Form.Input name='password' type='password' placeholder='password' value={this.state.password} onChange={this.handleChange}/>
          <Button>Submit</Button>
        </Form>
    </Menu>
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
    loginUser: (user) => {dispatch(loginUser(user))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
