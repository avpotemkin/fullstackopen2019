const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    likes: 1,
    title: 1,
    url: 1
  })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body
    const error = new Error()

    if (!body.password) {
      error.message = "Password is missing"
      error.name = "ValidationError"
      next(error)
    } else if (body.password.length <= 3) {
      error.message = "Password is too short"
      error.name = "ValidationError"
      next(error)
    } else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
      })

      const savedUser = await user.save()

      response.json(savedUser)
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
