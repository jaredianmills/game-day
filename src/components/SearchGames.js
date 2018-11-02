import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Card, Dimmer, Loader } from 'semantic-ui-react'
import { searchGames } from '../actions/gameActions.js'
import Boardgame from './Boardgame'

class SearchGames extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ''
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  renderDimmer = () => {
      return (
        <Dimmer active inverted>
          <Loader size='large'>Searching Games</Loader>
        </Dimmer>
      )
    }

  renderGames = () => {
    return (
        <Card.Group>
          {this.props.searchResults.map(game => <Boardgame key={game.objectid} boardgame={game} renderAddToCollection={true} />)}
        </Card.Group>
    )
  }

  renderSearchBarAndGames = () => {
    return (
      <React.Fragment>
        <Input name='searchTerm' placeholder='Game Title' value={this.state.searchTerm} onChange={this.handleChange}/>
        <Button onClick={() => this.props.searchGames(this.state.searchTerm)}>Submit</Button>
        <br/><br/>
        {this.renderGames()}
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.props.searchingForGames ? this.renderDimmer() : this.renderSearchBarAndGames()}
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    searchResults: state.gamesReducer.searchResults,
    error: state.gamesReducer.error,
    searchingForGames: state.gamesReducer.searchingForGames,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchGames: (searchTerm) => dispatch(searchGames(searchTerm)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGames)
