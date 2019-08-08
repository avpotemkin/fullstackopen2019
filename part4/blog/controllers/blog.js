const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const _ = require("lodash")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs.map(b => b.toJSON()))
})

blogRouter.post("/", async (request, response, next) => {
  const body = request.body
  const token = request.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({ ...body, user: user._id })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }

    const blogToBeDeleted = await Blog.findById(request.params.id)
    const requestingUser = await User.findById(decodedToken.id)
    const creatorUser = await blogToBeDeleted.user

    if (requestingUser._id.toString() !== creatorUser.toString()) {
      const error = new Error()
      error.name = "JsonWebTokenError"
      next(error)
    } else {
      await Blog.findByIdAndDelete(request.params.id)
      response
        .send(`Blog ${request.params.id} was deleted`)
        .status(204)
        .end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
      (error, result) => {
        console.log(result)
        response
          .json(result.toJSON())
          .status(200)
          .end()
      }
    ).populate("user", { username: 1, name: 1 })
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter
