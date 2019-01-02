import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Boardgame from './Boardgame'

const FindAGameResults = (props) => {
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
    let bestAt = game.best_at
    console.log(bestAt);
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

    if (bestAt.includes(params.playerCount)) {
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
      <Grid>
        <Grid.Row columns={5} only='computer'>
            {bestAtGames.map(game => {
              return (
                <Grid.Column key={game.objectid}>
                  <Boardgame boardgame={game} />
                </Grid.Column>
              )
            } )}
        </Grid.Row>

        <Grid.Row columns={2} only='mobile'>
            {bestAtGames.map(game => {
              return (
                <Grid.Column key={game.objectid}>
                  <Boardgame boardgame={game} />
                </Grid.Column>
              )
            } )}
        </Grid.Row>

        <Grid.Row columns={2} only='tablet'>
            {bestAtGames.map(game => {
              return (
                <Grid.Column key={game.objectid}>
                  <Boardgame boardgame={game} />
                </Grid.Column>
              )
            } )}
        </Grid.Row>
      </Grid>

      <h1>Games Playable at Your Player Count:</h1>
      <Grid>
        <Grid.Row columns={5} only='computer'>
            {playableAtCountGames.map(game => {
              return (
                <Grid.Column key={game.objectid}>
                  <Boardgame boardgame={game} />
                </Grid.Column>
              )
            } )}
        </Grid.Row>

        <Grid.Row columns={2} only='mobile'>
            {playableAtCountGames.map(game => {
              return (
                <Grid.Column key={game.objectid}>
                  <Boardgame boardgame={game} />
                </Grid.Column>
              )
            } )}
        </Grid.Row>

        <Grid.Row columns={2} only='tablet'>
            {playableAtCountGames.map(game => {
              return (
                <Grid.Column key={game.objectid}>
                  <Boardgame boardgame={game} />
                </Grid.Column>
              )
            } )}
        </Grid.Row>
      </Grid>
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
