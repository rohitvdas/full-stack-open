import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createNewBlog = (object) => {
  return async dispatch => {
    const newBlog = await blogService.create(object)
    dispatch({
      type: 'ADD_BLOG',
      blog: newBlog
    })
  }
}

const blogs = (state = [], action) => {
  switch(action.type) {

  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat(action.blog)

  default:
    return state
  }
}

export default blogs