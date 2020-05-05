import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [newComment, setNewComment] = useState('')

  if(!blog) return null

  const addComment = (event) => {
    event.preventDefault()
    blogService.addComment(blog._id, newComment)
    setNewComment('')
  }

  const absPath = `//${blog.url}`
  return(
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={absPath}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, i) =>
          <li key={i}>{c}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog
