import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Collection from './components/Collection'

class App extends Component {
  render() {
    console.log();
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Collection} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  }
}

export default withRouter(connect(mapStateToProps)(App))
