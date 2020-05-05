import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createNewBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loginNewUser } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.users.current)
  const users = useSelector(state => state.users.userList)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginNewUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(loginNewUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(loginNewUser(null))
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createNewBlog(blogObject))
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(b => b._id === blogMatch.params.id)
    : null

  if(user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blog app</h2>
      <div>
        <Link to='/' style={{ paddingRight: 5 }}>blogs</Link>
        <Link to='/users' style={{ paddingRight: 5 }}>users</Link>
        <p>{`${user.name} logged in`}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Switch>
        <Route path='/users/:id'>
          <User user={matchedUser} />
        </Route>
        <Route path='/users'>
          <h2>Users</h2>
          <table>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            {users.map(user =>
              <tr key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </table>
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={matchedBlog} />
        </Route>
        <Route path='/'>
          {blogForm()}
          <ul>
            {blogs.map(blog =>
              <li key={blog._id}>
                <Link to={`/blogs/${blog._id}`}>{blog.title} {blog.author}</Link>
              </li>
            )}
          </ul>
        </Route>
      </Switch>
    </div>
  )
}

export default App