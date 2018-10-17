import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import * as userActions from '../actions/userActions'

const withAuth = (WrappedComponent) => {
  class AuthorizedComponent extends React.Component {

    componentDidMount = () => {
      if (localStorage.getItem('jwt') && !this.props.loggedIn) {
        this.props.fetchCurrentUser()
      }
    }

    render() {
      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        return <WrappedComponent />
      } else {
        return <Redirect to='/login'/>
      }
    }

  }

  const mapStateToProps = (state) => {
    return {
      loggedIn: state.userReducer.loggedIn,
      authenticatingUser: state.userReducer.authenticatingUser
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchCurrentUser: () => dispatch(userActions.fetchCurrentUser())
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthorizedComponent)

}

export default withAuth
