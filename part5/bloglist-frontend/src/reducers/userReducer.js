import userService from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USER_LIST',
      data: users
    })
  }
}

export const loginNewUser = (user) => {
  return {
    type: 'CHANGE_USER',
    data: user
  }
}

const initialState = {
  current: null,
  userList: []
}

const users = (state = initialState, action) => {
  switch(action.type) {
  case 'INIT_USER_LIST':
    return { ...state, userList: action.data }

  case 'CHANGE_USER':
    return { ...state, current: action.data }

  default:
    return state
  }
}

export default users