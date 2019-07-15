import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const coursesNames = courses.map(course => course.name)
  console.log(coursesNames)
  const arrayOfChapters = courses.map(course => course.parts.map(course => course.name))
  console.log(arrayOfChapters)

  // console.log(arrayOfChapters.map(course => course.name))

  // const sumOfExercises = course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)

  const Course = ({courses}) => {

    const Header = ({courses}) => {
      return (
        <h1>
          {coursesNames}
        </h1>
      )
    }

    const Part = ({course}) => {
      return (
        <div>
          {courses.map(course => course.name)}
          {courses.map(course => course.parts.map(course => course.name))}
        </div>
      )
    }

    const Content = ({course}) => {
      return (
        <div>
          <Part courses={courses}/>
        </div>
      )
    }

    return (
      <div>
        <Content courses={courses}/>
      </div>
    )
  }

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))