import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import { withRouter, Redirect } from 'react-router'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'


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

  render() {
    if (this.props.user.loggedIn) {
      return <Redirect to='/' />
    } else {
      return this.renderForms()
    }
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default withRouter(connect(mapStateToProps)(LoginOrSignup))
