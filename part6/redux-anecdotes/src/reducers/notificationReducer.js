export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'CANCEL_REMOVE'
    })
    dispatch({
      type: 'SET',
      data: content
    })
    const cancelId = setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, time * 1000)
    dispatch({
      type: 'SET_CANCEL_ID',
      id: cancelId
    })
  }
}

const initialState = { text: null, cancelId: null }

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET':
      return { ...state, text: action.data }

    case 'REMOVE':
      return { ...state, text: null }
    
    case 'CANCEL_REMOVE':
      if(state.cancelId) clearTimeout(state.cancelId)
      return { ...state, cancelId: null }

    case 'SET_CANCEL_ID':
      return { ...state, cancelId: action.id }

    default:
      return state
  }
}

export default reducer