import React from 'react'
import { connect } from 'react-redux'
import { Segment, Menu, Container, Image } from 'semantic-ui-react'

let logo = require(`../images/goboard.jpeg`)

const Navbar = (props) => {
  return (
    <Segment vertical>
      <Menu borderless style={{border: 'none', boxShadow: 'none'}}>
        <Menu.Item>
          <Image circular size='small' src={logo}/>
        </Menu.Item>
        <Menu.Item style={{textAlign: 'center', float: 'left'}}>
          <h1 style={{fontSize: '4em'}}>Game Day</h1>
        </Menu.Item>
        {props.user ? <Menu.Item><h1>Welcome {props.user.username}</h1></Menu.Item> : null}
      </Menu>
    </Segment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(Navbar)
