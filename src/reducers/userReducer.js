let initialState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  userError: null
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'AUTHENTICATING_USER':
      return {...state, authenticatingUser: true}

    case 'SET_CURRENT_USER':
      return {...state, user: action.payload, loggedIn: true, authenticatingUser: false}

    case 'FAILED_LOGIN':
      return {...state, userError: action.payload}

    default:
      return state
  }
}

export default userReducer