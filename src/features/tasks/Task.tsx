import React from 'react'
import { useParams } from 'react-router-dom'

const Task: React.FC = () => {
  const taskId = useParams()
  return (
    <div>
      <h1>task details page</h1>
    </div>
  )
}

export default Task
