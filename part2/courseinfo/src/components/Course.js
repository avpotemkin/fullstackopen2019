import React from 'react'

const Course = ({ courses }) => {

    const sumOfExercises = (array) => {
        var sum = array.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)
        return sum
    }

    const Header = () => {
        return (
            <div>
                <h1>Web development curriculum</h1>
            </div>
        )
    }

    const Part = ({ courses }) => {
        return (
            <div>
                {courses.map(course => <ul key={course.id}><h3>{course.name}</h3>{course.parts.map(course => <li key={course.id}>{course.name}: {course.exercises}</li>)} <b>Total: {sumOfExercises(course)}</b></ul>)}
            </div>
        )
    }

    const Content = ({ courses }) => {
        return (
            <div>
                <Header />
                <Part courses={courses} />
            </div>
        )
    }

    return (
        <Content courses={courses} />
    )
}

export default Course 