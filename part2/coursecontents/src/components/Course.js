import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce((s, p) => s + p.exercises, 0)
  
    return(
      <b>total of {total} exercises</b>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(p =>
          <Part key={p.id} part={p} />
        )}
        <Total course={course} />
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return(
      <>
        <Header course={course} />
        <Content course={course} />
      </>
    )
  }

  export default Course