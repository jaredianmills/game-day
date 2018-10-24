import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import LoginOrSignup from './components/LoginOrSignup'
import Collection from './components/Collection'

class App extends Component {
  render() {
    console.log();
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Collection} />
          <Route exact path="/login" component={LoginOrSignup} />
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
