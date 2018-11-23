import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addBoardgameToCollectionBackend } from '../actions/gameActions.js'


const Boardgame = (props) => {
  return(
    <Card style={{height: "auto", width: "200px"}}>
      <a href={`https://boardgamegeek.com/boardgame/${props.boardgame.objectid}`} rel='noopener noreferrer' target="_blank">
        <Image src={props.boardgame.image} style={{height: "240px", width: "200px"}} alt={props.boardgame.title}/>
      </a>
      <Card.Content>
        <Card.Header>{props.boardgame.title}</Card.Header>
        <Card.Meta>
          Min Players: {props.boardgame.minplayers}
        </Card.Meta>
        <Card.Meta>
          Max Players: {props.boardgame.maxplayers}
        </Card.Meta>
        <Card.Meta>
          Best At: {props.boardgame.best_at ? `${props.boardgame.best_at} players` : `N/A`}
        </Card.Meta>
        <Card.Meta>
          Playtime: {props.boardgame.minplaytime === props.boardgame.maxplaytime ? props.boardgame.minplaytime : `${props.boardgame.minplaytime} - ${props.boardgame.maxplaytime}`} minutes
        </Card.Meta>
      </Card.Content>
      {props.renderAddToCollection ? renderAddToCollectionButton(props) : null}
    </Card>
  )
}

const renderAddToCollectionButton = (props) => {
  const boardgame = props.boardgame
  const user_id = props.user.id

  if (props.boardgames.find(game => game.objectid === boardgame.objectid)) {
    return (
      <Card.Content extra style={{textAlign: 'center'}}>
        <Button color='red'>
          You Own this Game
        </Button>
      </Card.Content>
    )
  } else {
    return (
      <Card.Content extra style={{textAlign: 'center'}}>
        <Button color='blue' onClick={() => props.addBoardgameToCollectionBackend(boardgame, user_id)}>
          Add To Collection
        </Button>
      </Card.Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    boardgames: state.collectionReducer.games
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBoardgameToCollectionBackend: (boardgame, user_id) => dispatch(addBoardgameToCollectionBackend(boardgame, user_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boardgame)
