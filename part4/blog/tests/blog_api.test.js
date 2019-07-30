const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app)

const initialBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
  //   {
  //     _id: "5a422b3a1b54a676234d17f9",
  //     title: "Canonical string reduction",
  //     author: "Edsger W. Dijkstra",
  //     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  //     likes: 12,
  //     __v: 0
  //   },
  //   {
  //     _id: "5a422b891b54a676234d17fa",
  //     title: "First class tests",
  //     author: "Robert C. Martin",
  //     url:
  //       "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  //     likes: 10,
  //     __v: 0
  //   },
  //   {
  //     _id: "5a422ba71b54a676234d17fb",
  //     title: "TDD harms architecture",
  //     author: "Robert C. Martin",
  //     url:
  //       "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  //     likes: 0,
  //     __v: 0
  //   },
  //   {
  //     _id: "5a422bc61b54a676234d17fc",
  //     title: "Type wars",
  //     author: "Robert C. Martin",
  //     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  //     likes: 2,
  //     __v: 0
  //   }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlog.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test("Blog posts are returned as json", async () => {
  await api
    .get("/api/blog")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("All blogs are returned", async () => {
  const response = await api.get("/api/blog")

  expect(response.body.length).toBe(initialBlog.length)
})

test("A specific author is within the returned posts", async () => {
  const response = await api.get("/api/blog")

  const author = response.body.map(r => r.author)

  expect(author).toContain("Michael Chan")
})

test("A valid post can be added ", async () => {
  const newBlog = {
    title: "Test",
    author: "Artem Potemkin",
    url: "test",
    likes: 0
  }

  await api
    .post("/api/blog")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blog")

  const title = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlog.length + 1)
  expect(title).toContain("Test")
})

afterAll(() => {
  mongoose.connection.close()
})
