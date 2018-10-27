import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Form, Button } from 'semantic-ui-react'
import FindAGameResults from './FindAGameResults'
import { setCollectionFilterParams } from '../actions/collectionActions'

class FindAGame extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playerCount: '',
      playTime: '',
      displayPlayerCountForm: true,
      displayPlayTimeForm: false,
      displayResults: false,
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleEnterPlayerCount = (event) => {
    event.preventDefault()
    return this.setState({...this.state, displayPlayerCountForm: false, displayPlayTimeForm: true})
    console.log(this.state);
  }

  handleEnterPlayTime = (event) => {
    event.preventDefault()
    const params = {playerCount: this.state.playerCount, playTime: this.state.playTime}
    this.props.setCollectionFilterParams(params)
    return this.setState({...this.state, displayPlayTimeForm: false, displayResults: true})

  }

  renderPlayerCountForm = () => {
    return (
      <div style={{width: '90%', marginLeft: '5%', height: '40%'}}>
        <Menu borderless widths={2} style={{paddingRight: '10%'}}>
          <Menu.Item><h3>Enter Player Count</h3></Menu.Item>
          <Menu.Item position='right'>
            <Form onSubmit={this.handleEnterPlayerCount}>
              <Form.Input name='playerCount' type='number' placeholder='Enter Player Count' value={this.state.playerCount} onChange={this.handleChange}/>
              <Button>Submit</Button>
            </Form>
          </Menu.Item>
        </Menu>
      </div>
    )
  }

  renderPlayTimeForm = () => {
    return (
      <div style={{width: '90%', marginLeft: '5%', height: '40%'}}>
        <Menu borderless widths={2} style={{paddingRight: '10%'}}>
          <Menu.Item><h3>Enter Play Time</h3></Menu.Item>
          <Menu.Item position='right'>
            <Form onSubmit={this.handleEnterPlayTime}>
              <Form.Input name='playTime' type='number' placeholder='Enter Play Time (minutes)' value={this.state.playTime} onChange={this.handleChange}/>
              <Button>Enter</Button>
            </Form>
          </Menu.Item>
        </Menu>
      </div>
    )
  }

  renderResults = () => {
    return (
        <FindAGameResults />
    )
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        {this.state.displayPlayerCountForm ? this.renderPlayerCountForm() : null}
        {this.state.displayPlayTimeForm ? this.renderPlayTimeForm() : null}
        {this.state.displayResults ? this.renderResults()  : null}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCollectionFilterParams: (params) => dispatch(setCollectionFilterParams(params))
  }
}

export default connect(null, mapDispatchToProps)(FindAGame)
