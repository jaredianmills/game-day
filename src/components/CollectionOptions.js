import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { Tab } from 'semantic-ui-react'
import { addBGGUsernameToUser, fetchBGGCollection } from '../actions/collectionActions'
import Collection from './Collection'
import FindAGame from './FindAGame'
import SearchGames from './SearchGames'
import EditProfile from './EditProfile'

class CollectionOptions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bgg_username: '',
    }
  }

  panes = [
    {menuItem: "Find a Game", render: () => <FindAGame />},
    {menuItem: `${this.props.user.username}'s Collection`, render: () => <Collection />},
    {menuItem: "Search Games", render: () => <SearchGames />},
    {menuItem: "Edit Profile", render: () => <EditProfile />},
  ]

  componentDidMount = () => {
    if (this.props.user.bgg_username) {
      this.setState({bgg_username: this.props.user.bgg_username})
      this.props.fetchBGGCollection(this.props.user.bgg_username)
    }
  }

  componentDidUpdate = () => {
    if (this.props.user.bgg_username !== this.state.bgg_username) {
      this.setState({bgg_username: this.props.user.bgg_username})
      this.props.fetchBGGCollection(this.props.user.bgg_username)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Tab panes={this.panes} menu={{borderless: true, tabular: false, color: 'blue'}} />
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
