import React from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Button, Grid } from 'semantic-ui-react'
import { logOut } from '../actions/userActions'

let logo = require(`../images/goboard.jpeg`)

const Navbar = (props) => {
  return (
        <Segment inverted color='blue'>
          <Grid padded relaxed columns='equal'>
              <Grid.Column>
                <Image src={logo} rounded bordered size='tiny' verticalAlign='middle'/>
              </Grid.Column>
              <Grid.Column style={{marginTop: '1%', textAlign: 'center', fontSize: '200%'}}>
                <h1 style={{textShadow: '2px 2px #000'}}>
                  Game Day
                </h1>
              </Grid.Column>
              {props.user ?
              <React.Fragment>
                <Grid.Column style={{textAlign: 'center', marginTop: '1.5%'}} only="computer">
                      <Button onClick={props.logOut} style={{marginLeft: '75%'}}>
                        Log Out
                      </Button>
                </Grid.Column>
                <Grid.Column style={{textAlign: 'center', marginTop: '4%'}} only="mobile">
                      <Button onClick={props.logOut} style={{marginLeft: '10%'}}>
                        Log Out
                      </Button>
                </Grid.Column>
                <Grid.Column style={{textAlign: 'center', marginTop: '1.5%'}} only="tablet">
                      <Button onClick={props.logOut} style={{marginLeft: '50%'}}>
                        Log Out
                      </Button>
                </Grid.Column>
              </React.Fragment>
            : <Grid.Column></Grid.Column>}
        </Grid>
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
