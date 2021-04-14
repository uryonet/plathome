import React from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'

interface ParamTypes {
  taskId: string
}

const Task: React.FC = () => {
  const { taskId } = useParams<ParamTypes>()
  return (
    <Box className="task">
      <h1>task details page</h1>
      <p>{taskId}</p>
    </Box>
  )
}

export default Task
