import React from 'react'
import { Segment, Menu, Container, Image } from 'semantic-ui-react'

let logo = require(`../images/goboard.jpeg`)

const Navbar = () => {
  return (
    <Segment vertical>
      {/* <Container> */}
      <Menu borderless style={{border: 'none', boxShadow: 'none'}}>
        <Menu.Item>
          <Image circular size='small' src={logo}/>
        </Menu.Item>
        <Menu.Item style={{textAlign: 'center', float: 'left'}}>
          <h1 style={{fontSize: '4em'}}>Game Day</h1>
        </Menu.Item>
      </Menu>
    {/* </Container> */}
    </Segment>
  )
}

export default Navbar
