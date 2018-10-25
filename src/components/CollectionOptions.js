import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { Form, Button, Menu, Dimmer, Loader, Card, Input, Tab } from 'semantic-ui-react'
import { addBGGUsernameToUser, fetchBGGCollection } from '../actions/collectionActions'
import Boardgame from './Boardgame'
import Collection from './Collection'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const panes = [
  {menuItem: "My Full Collection", render: () => <Collection />}
]

class CollectionOptions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bgg_username: '',
    }
  }

  render() {
    return (
      <React.Fragment>
        <Tab panes={panes} menu={{borderless: true, tabular: false, color: 'blue'}} />
      </React.Fragment>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    loggedIn: state.userReducer.loggedIn,
    authenticatingUser: state.userReducer.authenticatingUser,
    games: state.collectionReducer.games,
    fetchingBGGCollection: state.collectionReducer.fetchingBGGCollection,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBGGUsernameToUser: (user, bgg_username) => dispatch(addBGGUsernameToUser(user, bgg_username)),
    fetchBGGCollection: (bgg_username) => dispatch(fetchBGGCollection(bgg_username))
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(CollectionOptions))
