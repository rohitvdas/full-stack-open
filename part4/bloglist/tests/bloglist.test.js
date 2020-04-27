const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
  test('of empty array is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('of one value is the value itself', () => {
    const blogs = [
      {
        title: "rohit's blog",
        author: "rohit das",
        url: "rohitdas.com",
        likes: 1
      }
    ]

    expect(listHelper.totalLikes(blogs)).toBe(1)
  })

  test('of many is calculated right', () => {
    const blogs = [
      {
        title: "rohit's blog",
        author: "rohit das",
        url: "rohitdas.com",
        likes: 1
      },
      {
        title: "jaya's blog",
        author: "jaya das",
        url: "jayadas.com",
        likes: 2
      },
      {
        title: "vijay's blog",
        author: "vijay das",
        url: "vijaydas.com",
        likes: 3
      }
    ]

    expect(listHelper.totalLikes(blogs)).toBe(6)
  })
})