const Course = ({ course }) => {
    console.log(course)
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <div>
        <p>{name} {exercises}</p>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    console.log(parts)
    return (
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={parts.exercises} />)}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce( (acc, cur) => acc + cur.exercises, 0)
    return (
      <div>
        <p><strong>Total of {total} exercises</strong></p>
      </div>
    )
  }

  export default Course