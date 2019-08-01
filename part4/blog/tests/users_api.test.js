const User = require("../models/user")
const supertest = require("supertest")
const app = require("../app")
const testHelper = require("../utils/test_helper")

const api = supertest(app)

describe("Username and password validation", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: "root", password: "sekret" })
    await user.save()
  })

  test("Username too short", async () => {
    const user = new User({ username: "12", password: "12345" })
    const response = await api.post('/api/users/').send(user)
    expect(response.status).toBe(400)
  })

  test("Password too short", async () => {
    const user = new User({ username: "12345", password: "34" })
    const response = await api.post('/api/users/').send(user)
    expect(response.status).toBe(400)
  })

  test("Password is missing", async () => {
    const user = new User({ username: "12345" })
    const response = await api.post('/api/users/').send(user)
    expect(response.status).toBe(400)
  })

  test("Username is missing", async () => {
    const user = new User({ password: "34" })
    const response = await api.post('/api/users/').send(user)
    expect(response.status).toBe(400)
  })
})
