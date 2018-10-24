import { combineReducers } from "redux";
import userReducer from './userReducer'
import collectionReducer from './collectionReducer'

const rootReducer = combineReducers({
    userReducer,
    collectionReducer,
})

export default rootReducer
