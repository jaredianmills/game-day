import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Menu } from 'semantic-ui-react'
import { createUser } from '../actions/userActions'

class LoginForm extends Component {
 constructor(props) {
    super(props)

      this.state = {
        username: '',
        password: '',
        bgg_username: '',
        checkBGGUserName: false,
      }
  }

  handleChange = (event) => {
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  changeForms = (event) => {
    event.preventDefault()
    this.setState({...this.state, checkBGGUserName: true})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.createUser({
      username: this.state.username,
      password: this.state.password,
      bgg_username: this.state.bgg_username
    })
  }

  renderSignupForm = () => {
    return (
      <React.Fragment>
        <Menu.Item position="left"><h3>Sign Up</h3></Menu.Item>
        <Menu.Item>
          <Form onSubmit={this.changeForms}>
            <Form.Input name='username' placeholder='username' value={this.state.username} onChange={this.handleChange}/>
            <Form.Input name='password' type='password' placeholder='password' value={this.state.password} onChange={this.handleChange}/>
            <Button>Submit</Button>
          </Form>
        </Menu.Item>
      </React.Fragment>
    )
  }

  checkForBGGUsername = () => {
    return (
      <React.Fragment>
        <Menu.Item>
            <h4>
              Have a Board Game Geek account? Enter your username. <br/>
              (You can leave this blank if you do not have a BGG account.)
            </h4>
        </Menu.Item>
        <Menu.Item>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input name='bgg_username' placeholder='BGG username' value={this.state.bgg_username} onChange={this.handleChange}/>
            <Button>Submit</Button>
          </Form>
        </Menu.Item>
      </React.Fragment>
      )
  }

  render() {
    return (
    <div style={{width: '90%', marginLeft: '5%', height: '40%'}}>
      <Menu borderless widths={2} style={{paddingRight: '10%'}}>
        {this.state.checkBGGUserName ? this.checkForBGGUsername() : this.renderSignupForm()}
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
