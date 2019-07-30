const _ = require("lodash")

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.length !== 0
    ? blogs.reduce((sumOfLikes, blog) => {
        return blog.likes + sumOfLikes
      }, 0)
    : 0
}

const favoriteBlog = blogs => {
  const maxLikes = blogs.reduce((likes, blog) => {
    return Math.max(likes, blog.likes)
  }, 0)

  if (blogs.length !== 0) {
    const topBlog = blogs.find(b => b.likes === maxLikes)
    delete topBlog._id
    delete topBlog.__v
    delete topBlog.url
    return topBlog
  } else {
    return []
  }
}

const mostBlogs = blogs => {
  if (blogs.length !== 0) {
    const numberOfBlogs = _.countBy(blogs, "author")

    return _.keys(numberOfBlogs).reduce((a, b) => {
      return {
        author: numberOfBlogs[a] > numberOfBlogs[b] ? a : b,
        blogs: numberOfBlogs[b]
      }
    }, numberOfBlogs[0])
  } else {
    return []
  }
}

const mostLikes = blogs => {
  if (blogs.length !== 0) {
    const authorLikesDict = Array.from(
      blogs.reduce(
        (m, { author, likes }) => m.set(author, (m.get(author) || 0) + likes),
        new Map()
      ),
      ([author, likes]) => ({ author, likes })
    )

    var maxLikes = Math.max(...authorLikesDict.map(item => item.likes))
    var result = authorLikesDict.find(item => item.likes === maxLikes)

    return result
  } else {
    return []
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
