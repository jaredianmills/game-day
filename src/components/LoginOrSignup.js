import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import { withRouter, Redirect } from 'react-router'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { Dimmer, Loader } from 'semantic-ui-react'


const panes = [
  {menuItem: "Login", render: () => <LoginForm />},
  {menuItem: "Sign Up", render: () => <SignupForm />}
]

class LoginOrSignup extends Component {
 constructor(props) {
    super(props)

      this.state = {
        username: '',
        password: ''
      }
  }

  renderForms = () => {
    return (
      <React.Fragment>
        <Tab panes={panes} menu={{borderless: true, tabular: false}}/>
      </React.Fragment>
    )
  }

  renderDimmer = () => {
      return (
        <Dimmer active inverted>
          <Loader size='large'>Loggin In User</Loader>
        </Dimmer>
      )
    }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to='/' />
    } else if (this.props.authenticatingUser) {
      return this.renderDimmer()
    } else {
      return this.renderForms()
    }
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    loggedIn: state.userReducer.loggedIn,
    authenticatingUser: state.userReducer.authenticatingUser,
  }
}

export default withRouter(connect(mapStateToProps)(LoginOrSignup))
