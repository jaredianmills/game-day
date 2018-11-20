import React from 'react'
import { connect } from 'react-redux'
import { Segment, Menu, Image, Button, Grid } from 'semantic-ui-react'
import { logOut } from '../actions/userActions'

let logo = require(`../images/goboard.jpeg`)

const Navbar = (props) => {
  return (
    <Segment vertical style={{height: '100%'}}>
      {/* <Menu borderless style={{border: 'none', boxShadow: 'none'}}> */}
        {/* <Menu.Item> */}
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Image circular style={{width: '20%', height: 'auto'}} src={logo}/>
            </Grid.Column>
        {/* </Menu.Item> */}
        {/* <Menu.Item style={{textAlign: 'center', float: 'right'}}> */}
        <Grid.Column>
          <h1 style={{fontSize: '200%', marginLeft: '20%', paddingTop: '6%'}}>Game Day</h1>
        </Grid.Column>
        {/* </Menu.Item> */}
        <Grid.Column>
        {props.user ?
          <React.Fragment>
            <Menu.Item style={{paddingTop: '7%'}}>
              <Button onClick={props.logOut}>
                Log Out
              </Button>
            </Menu.Item>
          </React.Fragment>
        : null}
      </Grid.Column>
      </Grid.Row>
      </Grid>
      {/* </Menu> */}
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
