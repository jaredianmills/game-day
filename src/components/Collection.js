import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'

class Collection extends Component {
  render() {
    return (
      <h1>hi from collection</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default withAuth(connect(mapStateToProps)(Collection))
