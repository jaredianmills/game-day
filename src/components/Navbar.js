import React from 'react'
import { connect } from 'react-redux'
import { Segment, Menu, Container, Image, Button } from 'semantic-ui-react'
import { logOut } from '../actions/userActions'

let logo = require(`../images/goboard.jpeg`)

const Navbar = (props) => {
  console.log(props);
  return (
    <Segment vertical>
      <Menu borderless style={{border: 'none', boxShadow: 'none'}}>
        <Menu.Item>
          <Image circular size='small' src={logo}/>
        </Menu.Item>
        <Menu.Item style={{textAlign: 'center', float: 'left'}}>
          <h1 style={{fontSize: '4em'}}>Game Day</h1>
        </Menu.Item>
        {props.user ?
          <React.Fragment>
            <Menu.Item>
              <h1>
                Welcome {props.user.username}
              </h1>
            </Menu.Item>
            <Menu.Item>
              <Button onClick={props.logOut}>
                Log Out
              </Button>
            </Menu.Item>
          </React.Fragment>
        : null}
      </Menu>
    </Segment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
