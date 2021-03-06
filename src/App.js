import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import LoginOrSignup from './components/LoginOrSignup'
import CollectionOptions from './components/CollectionOptions'

class App extends Component {
  render() {
    console.log();
    return (
      <div style={{display: 'block', width: '100%'}}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={CollectionOptions} />
          <Route exact path="/login" component={LoginOrSignup} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  }
}

export default withRouter(connect(mapStateToProps)(App))
