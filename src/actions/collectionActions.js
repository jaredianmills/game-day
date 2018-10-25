export const addBGGUsernameToUser = (user, bgg_username) => {
  return (dispatch) => {
    let configObj = {method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ bgg_username })
    }
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${user.id}`, configObj)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
    .then(user => {
      dispatch({type: 'ADD_BGG_USERNAME_TO_USER_IN_STATE', payload: user})
      dispatch(fetchBGGCollection(user.bgg_username))
    })
    .catch(r => r.json().then(e => dispatch({ type: 'FAILED_TO_ADD_BGG_USERNAME_TO_USER', payload: e.message })))
  }
}

export const fetchBGGCollection = (bgg_username) => {
  return (dispatch) => {
    dispatch({type: 'FETCHING_BGG_COLLECTION'})
    let configObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
  	  'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ search_term: bgg_username })
      }
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/collections/search`, configObj)
      .then(response => response.json())
      // .then(games => console.log(games))
      // .then(collection => dispatch({type: 'ADD_COLLECTION_TO_STATE', payload: collection}))
      .then(games => {
        games.forEach(game => dispatch(fetchSingleGame(game)))
      })
  }
}

const fetchSingleGame = (boardgame) => {
  return (dispatch) => {
      let configObj = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json',
    	    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({ boardgame })
        }
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/boardgames/search_by_id`, configObj)
        .then(response => response.json())
        .then(game => dispatch({type: 'ADD_GAME_TO_STATE', payload: game}))
    }
}
