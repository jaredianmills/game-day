import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { Form, Button, Menu, Dimmer, Loader, Card } from 'semantic-ui-react'
import { addBGGUsernameToUser, fetchBGGCollection } from '../actions/collectionActions'
import Boardgame from './Boardgame'

class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bgg_username: ''
    }
  }

  componentDidMount = () => {
    if (this.props.user.bgg_username) {
      this.props.fetchBGGCollection(this.props.user.bgg_username)
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addBGGUsernameToUser(this.props.user, this.state.bgg_username)
    this.setState({bgg_username: ''})
  }

  checkForBGGUsername = () => {
    return (
      <div style={{width: '90%', marginLeft: '5%', height: '40%'}}>
        <Menu borderless widths={2} style={{paddingRight: '10%'}}>
          <Menu.Item><h3>Have a Board Game Geek account? Enter your username</h3></Menu.Item>
      <Menu.Item>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input name='bgg_username' placeholder='BGG username' value={this.state.bgg_username} onChange={this.handleChange}/>
          <Button>Submit</Button>
        </Form>
      </Menu.Item>
      </Menu>
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

    renderGames = () => {
      return (
        <Card.Group style={{marginRight: '5%'}}>
          {this.props.games.map(game => <Boardgame key={game.objectid} boardgame={game} />)}
        </Card.Group>
      )
    }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <br/>
        {this.props.fetchingBGGCollection ? this.renderDimmer() : this.renderGames()}
        {this.props.user.bgg_username ? null : this.checkForBGGUsername()}
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

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Collection))
