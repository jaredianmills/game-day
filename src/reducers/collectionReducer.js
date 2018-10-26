let initialState = {
  games: [],
  fetchingBGGCollection: false,
  collectionInState: false
}

const collectionReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCHING_BGG_COLLECTION':
      return {...state, fetchingBGGCollection: true}

    case 'DONE_FETCHING_BGG_COLLECTION':
      return {...state, fetchingBGGCollection: false, collectionInState: true}

    case 'ADD_COLLECTION_TO_STATE':
      return {...state, games: action.payload}

    case 'ADD_GAME_TO_STATE':
      return {...state, games: [...state.games, action.payload], fetchingBGGCollection: false}

    case 'LOG_OUT':
      return {...state, games: []}

    default:
      return state
  }
}

export default collectionReducer
