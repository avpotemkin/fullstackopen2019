const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const testHelper = require ('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = testHelper.initialBlog.map(blog => new Blog(blog))
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

  expect(response.body.length).toBe(testHelper.initialBlog.length)
})

test("A specific author is within the returned posts", async () => {
  const response = await api.get("/api/blog")

  const author = response.body.map(r => r.author)

  expect(author).toContain("Michael Chan")
})

test("A unique identifier is named id", async () => {
  const response = await api.get("/api/blog")
  response.body.map(b => {
    expect(b.id).toBeDefined()
  })
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

  expect(response.body.length).toBe(testHelper.initialBlog.length + 1)
  expect(title).toContain("Test")
})

test("If likes field is missing from post request, ensure that the default value for likes is 0", async () => {
  const newBlog = {
    title: "Test",
    author: "Artem Potemkin",
    url: "test"
  }

  const response = await api.post("/api/blog").send(newBlog)

  expect(response.body).toMatchObject({
    likes: 0
  })
})

test("If title or url are missing from the post request, server returns status 400", async () => {

  const newBlog = {
    author: "Artem Potemkin",
  }

  const response = await api.post("/api/blog").send(newBlog)

  expect(response.status).toBe(400)
})

describe('Deleting', () => {
  test('Delete by ID', async () => {
    const blogAtStart = await testHelper.blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api.delete(`/api/blog/${blogToDelete.id}`)

    const blogAtEnd = await testHelper.blogsInDb()

    expect(blogAtEnd.length).toBe(testHelper.initialBlog.length - 1)

    const ids = blogAtEnd.map(b => b.id)

    expect(ids).not.toContain(blogToDelete.id)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
