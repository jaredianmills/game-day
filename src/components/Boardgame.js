import React from 'react'
import { Card, Image } from 'semantic-ui-react'


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
          Best At: {props.boardgame.best_at} players
        </Card.Meta>
        <Card.Meta>
          Playtime: {props.boardgame.minplaytime === props.boardgame.maxplaytime ? props.boardgame.minplaytime : `${props.boardgame.minplaytime} - ${props.boardgame.maxplaytime}`} minutes
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default Boardgame
