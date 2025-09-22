const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favBlog, blog) => {
    return (favBlog.likes < blog.likes) ? blog: favBlog
  })
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  const authors = blogs.reduce((occ, { author }) => {
    occ[author] = (occ[author] || 0) + 1
    return occ
  }, {})

  const [author, blogCount] = Object.entries(authors)
    .reduce((max, entry) => entry[1] > max[1] ? entry : max)

  return { author: author, blogs: blogCount }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}