import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    console.log();
    return (
      'hello world'
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(App)
