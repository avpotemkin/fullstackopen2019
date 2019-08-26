const blogs = [
  {
    likes: 16,
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: {
      username: 'newuser',
      id: '5d42caf9210f9935b0d78586'
    },
    id: '5d442083e2ba0c21a4c32ac6'
  },
  {
    likes: 17,
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    user: {
      username: 'newuser',
      id: '5d42caf9210f9935b0d78586'
    },
    id: '5d4420aae2ba0c21a4c32ac7'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
