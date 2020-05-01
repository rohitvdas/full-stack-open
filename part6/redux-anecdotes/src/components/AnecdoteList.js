import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { vote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const handleVote = (id, content) => {
    dispatch(vote(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return(
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)

export default ConnectedAnecdoteList