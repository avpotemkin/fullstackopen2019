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

module.exports = {
  dummy,
  totalLikes
}
