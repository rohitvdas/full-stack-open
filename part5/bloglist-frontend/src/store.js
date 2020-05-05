import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

let reducer = combineReducers({
  users: userReducer,
  blogs: blogReducer
})

export default createStore(reducer, applyMiddleware(thunk))