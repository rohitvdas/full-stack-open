import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }

  const newObject = {
    comment
  }

  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject, config)
  return response.data
}

export default { getAll, create, setToken, addComment }