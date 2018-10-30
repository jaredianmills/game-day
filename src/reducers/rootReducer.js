import { combineReducers } from "redux";
import userReducer from './userReducer'
import collectionReducer from './collectionReducer'
import gamesReducer from './gamesReducer'

const rootReducer = combineReducers({
    userReducer,
    collectionReducer,
    gamesReducer,
})

export default rootReducer
