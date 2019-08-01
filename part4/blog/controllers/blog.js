const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const _ = require("lodash")

const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs.map(b => b.toJSON()))
})

blogRouter.post("/", async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)

  try {
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    // if (!token || !decodedToken.id) {
    //   return response.status(401).json({ error: "token missing or invalid" })
    // }
    // const user = await User.findById(body.userId)

    const user = await User.findById("5d429f0a1e3d793c84b0bf6d")

    const blog = new Blog({ ...body, user: user._id }).populate('user')

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
    await Blog.findByIdAndDelete(request.params.id)
    response
      .send(`Blog ${request.params.id} was deleted`)
      .status(204)
      .end()
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
        response
          .json(result.toJSON())
          .status(200)
          .end()
      }
    )
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter
