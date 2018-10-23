import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'

class Collection extends Component {

  render() {
    console.log(this.props);
    return (
      <h1>hi from collection</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    loggedIn: state.userReducer.loggedIn,
    authenticatingUser: state.userReducer.authenticatingUser,
  }
}

export default withAuth(connect(mapStateToProps)(Collection))
