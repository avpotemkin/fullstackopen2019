const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(b => b.toJSON()))
})

blogRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
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
