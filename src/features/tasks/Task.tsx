import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectTasks } from './tasksSlice'

import { TodoTask } from 'microsoft-graph'
import { Box, TextField } from '@material-ui/core'

interface ParamTypes {
  taskId: string
}

const Task: React.FC = () => {
  const { taskId } = useParams<ParamTypes>()
  const { tasks } = useSelector(selectTasks)
  const [currentTask, setCurrentTask] = useState<TodoTask>({})

  useEffect(() => {
    const selectedTask = tasks.find((task) => task.id === taskId)
    if (selectedTask) {
      setCurrentTask(selectedTask)
    }
  }, [])

  return (
    <Box className="task-detail">
      <TextField fullWidth value={currentTask.title} inputProps={{ style: { fontSize: 24 } }} />
    </Box>
  )
}

export default Task
