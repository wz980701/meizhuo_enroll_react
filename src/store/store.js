import {createStore, combineReducers, applyMiddleware} from 'redux'
import * as interview from './interview/reducer'
import thunk from 'redux-thunk'

let store = createStore(
    combineReducers({...interview}),
    applyMiddleware(thunk)
)

export default store
