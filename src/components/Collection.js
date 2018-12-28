import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { Message, Dimmer, Loader, Input, Grid } from 'semantic-ui-react'
import { addBGGUsernameToUser, fetchBGGCollection } from '../actions/collectionActions'
import Boardgame from './Boardgame'

class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bgg_username: '',
      searchTerm: ''
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleBGGUsernameSubmit = (event) => {
    event.preventDefault()
    this.props.addBGGUsernameToUser(this.props.user, this.state.bgg_username)
    this.setState({bgg_username: ''})
  }

  noGamesInCollection = () => {
    return (
      <div style={{width: '90%', marginLeft: '15%', height: '40%', paddingRight: '20%', textAlign: 'center'}}>
        <Message size='large'>
          <Message.Header>There are no games currently in your collection.</Message.Header>
          <Message.Content>If you have a Boardgame Geek username, add the username to your profile</Message.Content>
          <Message.Content>Or use the Add Games to Collection tab above</Message.Content>
        </Message>
      </div>
      )
  }

  renderDimmer = () => {
      return (
        <Dimmer active inverted>
          <Loader size='large'>Fetching Your Collection</Loader>
        </Dimmer>
      )
    }

    filterGames = () => {
      return this.props.games.filter(game => game.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }

    renderGames = () => {
      return (
          <Grid>
            <Grid.Row columns={5} only='computer'>
                {this.filterGames().map(game => {
                  return (
                    <Grid.Column key={game.objectid}>
                      <Boardgame boardgame={game} />
                    </Grid.Column>
                  )
                } )}
            </Grid.Row>

            <Grid.Row columns={2} only='mobile'>
                {this.filterGames().map(game => {
                  return (
                    <Grid.Column key={game.objectid}>
                      <Boardgame boardgame={game} />
                    </Grid.Column>
                  )
                } )}
            </Grid.Row>

            <Grid.Row columns={2} only='tablet'>
                {this.filterGames().map(game => {
                  return (
                    <Grid.Column key={game.objectid}>
                      <Boardgame boardgame={game} />
                    </Grid.Column>
                  )
                } )}
            </Grid.Row>
          </Grid>
      )
    }

    renderSearchBar = () => {
      return (
        <Input name='searchTerm' placeholder='Search Games' value={this.state.searchTerm} onChange={this.handleChange} />
      )
    }

  render() {
    return (
      <React.Fragment>
        {this.props.games.length > 0 ? this.renderSearchBar() : null}
        <br/><br/>
        {this.props.fetchingBGGCollection ? this.renderDimmer() : this.renderGames()}
        {this.props.games.length > 0 ? null : this.noGamesInCollection()}
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
    collectionInState: state.collectionReducer.collectionInState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBGGUsernameToUser: (user, bgg_username) => dispatch(addBGGUsernameToUser(user, bgg_username)),
    fetchBGGCollection: (bgg_username) => dispatch(fetchBGGCollection(bgg_username))
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Collection))
