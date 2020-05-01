import anecdoteService from '../services/anecdotes'

export const vote = (id) => {
  return async dispatch => {
    await anecdoteService.voteById(id)
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'VOTE',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE': 
      return action.data
    default:
      return state
  }
}

export default reducer