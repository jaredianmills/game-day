export const searchGames = (searchTerm) => {
  return (dispatch) => {
    dispatch({ type: 'SEARCHING_FOR_GAMES' })
    let configObj = {method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ search_term: searchTerm })
    }
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/boardgames/search`, configObj)
      .then(response => response.json())
      .then(games => {
        if (games.error) {
          dispatch({type: 'UNABLE_TO_FIND_GAME', payload: games.error})
        } else {
          dispatch({type: 'SET_SEARCH_RESULTS', payload: games})
        }
      })
  }
}

export const addBoardgameToCollection = (boardgame, user_id) => {
  return (dispatch) => {
    const boardgame_id = boardgame.objectid
    const configObj = {method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ boardgame_id, user_id})
    }
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/boardgames`, configObj)
      .then(response => response.json())
      .then(r => console.log(r))
    // dispatch({type: 'ADD_BOARDGAME_TO_COLLECTION', payload: boardgame})
  }
}
