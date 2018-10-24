import React from 'react'
import { connect } from 'react-redux'
import { Card, Image, Button } from 'semantic-ui-react'


const Boardgame = (props) => {
  return(
    <Card style={{height: "360px", width: "200px"}}>
      <Image src={props.boardgame.image} style={{height: "240px", width: "200px"}}/>
      <Card.Content>
        <Card.Header>{props.boardgame.title}</Card.Header>
        <Card.Meta>
          Min players: {props.boardgame.minplayers}
        </Card.Meta>
        <Card.Meta>
          Max players: {props.boardgame.maxplayers}
        </Card.Meta>
        <Card.Meta>
          Playtime: {props.boardgame.minplaytime === props.boardgame.maxplaytime ? props.boardgame.minplaytime : `${props.boardgame.minplaytime} - ${props.boardgame.maxplaytime}`} minutes
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default Boardgame
