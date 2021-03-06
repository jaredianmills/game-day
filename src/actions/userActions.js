export const loginUser = (user) => {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATING_USER' })
    let configObj = {method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ user })
    }
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, configObj)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
      })
      .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
  }
}

export const fetchCurrentUser = () => {
  return (dispatch) => {
    dispatch(authenticatingUser())
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/profile`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}
    })
    .then(resp => resp.json())
    .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
  }
}

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })

export const createUser = (user) => {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATING_USER' })
    let postConfig = {method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ user })
    }
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/users`, postConfig)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
      })
      .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.error })))
  }
}

export const logOut = () => {
  return {type: 'LOG_OUT'}
}

export const editUser = (user) => {
  return (dispatch) => {
    console.log('updating...');
    dispatch({type: 'AUTHENTICATING_USER'})
    let configObj = {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({ user })
    }

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${user.id}`, configObj)
    .then(response => response.json())
    .then(user => {
      if (user.error) {
        throw user
      } else {
        return dispatch({type: 'UPDATED_USER', payload: user})
      }
    })
    .catch(r => dispatch({type: 'ERROR_UPDATING_USER', payload: r.error}))
  }
}
