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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
