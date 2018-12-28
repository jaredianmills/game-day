import React from 'react'
import { connect } from 'react-redux'
import { Segment, Menu, Image, Button, Grid } from 'semantic-ui-react'
import { logOut } from '../actions/userActions'

let logo = require(`../images/goboard.jpeg`)

const Navbar = (props) => {
  return (
        <Grid padded relaxed centered columns={2}>
          {/* <Grid.Row centered> */}
            {/* <Grid.Column>
              <Image circular style={{width: '20%', height: 'auto', marginLeft: '5%'}} src={logo}/>
            </Grid.Column> */}
            <Grid.Column>
              <h1 style={{fontSize: '200%', paddingTop: '7%', textAlign: 'center'}}>
                Game Day
              </h1>
            </Grid.Column>
            <Grid.Column float='right'>
            {props.user ?
              <div style={{paddingTop: '7%', paddingLeft: '50%'}}>
                  <Button onClick={props.logOut}>
                    Log Out
                  </Button>
              </div>
            : null}
          </Grid.Column>
        {/* </Grid.Row> */}
      </Grid>
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
