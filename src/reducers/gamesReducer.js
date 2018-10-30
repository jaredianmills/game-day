let initialState = {
  searchResults: [],
  error: null,
  searchingForGames: false
}

const gamesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SEARCHING_FOR_GAMES':
      return {...state, searchingForGames: true, searchResults: []}

    case 'SET_SEARCH_RESULTS':
      return {...state, searchingForGames: false, searchResults: action.payload}

    case 'UNABLE_TO_FIND_GAME':
      return {...state, searchingForGames: false, error: action.payload}

    default:
      return state
  }
}

export default gamesReducer
