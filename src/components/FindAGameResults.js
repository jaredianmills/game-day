import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import Boardgame from './Boardgame'
import FindAGame from './FindAGame'

const FindAGameResults = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      {filterGames(props.games, props.collectionFilterParams)}
    </React.Fragment>
  )
}

const filterGames = (games, params) => {
  let bestAtGames = []
  let playableAtCountGames = []

  games.forEach(game => {
    let bestAt = parseInt(game.best_at)
    let minPlayers = parseInt(game.minplayers)
    let maxPlayers = parseInt(game.maxplayers)
    let minPlayTime = parseInt(game.minplaytime)
    let maxPlayTime = parseInt(game.maxplaytime)

    let paramsPlayerCount = parseInt(params.playerCount)
    let paramsPlayTime = parseInt(params.playTime)

    if (paramsPlayTime) {
      if (minPlayTime > paramsPlayTime || maxPlayTime > paramsPlayTime) {
        return
      }
    }

    if (bestAt === paramsPlayerCount) {
      bestAtGames.push(game)
    } else if (paramsPlayerCount >= minPlayers && paramsPlayerCount <= maxPlayers) {
      playableAtCountGames.push(game)
    }
  })

  return displayFilteredGames(bestAtGames, playableAtCountGames)
}

const displayFilteredGames = (bestAtGames, playableAtCountGames) => {
  return (
    <React.Fragment>
      <h1>Games Best at Your Player Count:</h1>
      <Card.Group>
        {bestAtGames.map(game => <Boardgame key={game.objectid} boardgame={game}/>)}
      </Card.Group>

      <h1>Games Playable at Your Player Count:</h1>
      <Card.Group>
        {playableAtCountGames.map(game => <Boardgame key={game.objectid} boardgame={game}/>)}
      </Card.Group>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    games: state.collectionReducer.games,
    collectionFilterParams: state.collectionReducer.collectionFilterParams
  }
}

export default connect(mapStateToProps)(FindAGameResults)
