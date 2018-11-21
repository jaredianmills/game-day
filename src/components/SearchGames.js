import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Dimmer, Loader, Form } from 'semantic-ui-react'
import { searchGames } from '../actions/gameActions.js'
import Boardgame from './Boardgame'

class SearchGames extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ''
    }
  }

  componentDidMount = () => {
    this.props.resetGameSearchResults()
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
        <Form onSubmit={() => this.props.searchGames(this.state.searchTerm)}>
          <Form.Group>
            <Form.Input name='searchTerm' placeholder='Game Title' value={this.state.searchTerm} onChange={this.handleChange}/>
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
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
    resetGameSearchResults: () => dispatch({type: 'SET_SEARCH_RESULTS', payload: []})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGames)
