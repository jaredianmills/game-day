import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Menu, Message } from 'semantic-ui-react'
import { editUser } from '../actions/userActions'

class EditProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      username: this.props.username,
      bgg_username: this.props.bgg_username,
    }
  }

  handleChange = (event) => {
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  handleSubmit = () => {
    this.props.editUser(this.state)
  }

  renderErrorMessage = () => {
    return (
      <Message negative>
        <Message.Header>
          There was an error processing your request
        </Message.Header>
        <p>
          {this.props.updateError}
        </p>
      </Message>
    )
  }

  render() {
    return (
      <div style={{width: '90%', marginLeft: '5%', height: '40%'}}>
        {this.props.updateError ? this.renderErrorMessage() : null}
        <Menu borderless widths={2} style={{paddingRight: '10%'}}>
          <Menu.Item><h3>Edit Your Profile</h3></Menu.Item>
          <Menu.Item position='right'>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Username</label>
                <Form.Input name='username' placeholder='username' value={this.state.username} onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <label>Boardgame Geek Username</label>
                <Form.Input name='bgg_username' placeholder='Boardgame Geek Username' value={this.state.bgg_username} onChange={this.handleChange}/>
              </Form.Field>
              <Button>Submit</Button>
            </Form>
          </Menu.Item>
          <br/>
        </Menu>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.userReducer.user.id,
    username: state.userReducer.user.username,
    bgg_username: state.userReducer.user.bgg_username,
    updateError: state.userReducer.updateError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (user) => dispatch(editUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
