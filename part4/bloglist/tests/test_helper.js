const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Rohit\'s Blog',
    author: 'Rohit Das',
    url: 'rohitdas.com',
    likes: 1
  },
  {
    title: 'Jaya\'s Blog',
    author: 'Jaya Das',
    url: 'jayadas.com',
    likes: 2
  },
  {
    title: 'Vijay\'s Blog',
    author: 'Vijay Das',
    url: 'vijaydas.com',
    likes: 3
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}