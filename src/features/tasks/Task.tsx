import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchToggleStatus, selectTasks } from './tasksSlice'

import { TodoTask } from 'microsoft-graph'
import { Box, Checkbox, TextField } from '@material-ui/core'

interface ParamTypes {
  taskId: string
}

const Task: React.FC = () => {
  const { taskId } = useParams<ParamTypes>()
  const { taskListId, tasks } = useSelector(selectTasks)
  const [currentTask, setCurrentTask] = useState<TodoTask>({})
  const dispatch = useDispatch()

  useEffect(() => {
    const selectedTask = tasks.find((task) => task.id === taskId)
    if (selectedTask) {
      setCurrentTask(selectedTask)
    }
  }, [])

  const handleClickToggle = () => {
    dispatch(fetchToggleStatus(taskListId, currentTask))

    const task = { ...currentTask }
    task.status = currentTask.status === 'completed' ? 'notStarted' : 'completed'
    setCurrentTask(task)
  }

  return (
    <Box className="task-detail" display="flex">
      <Checkbox edge="start" checked={currentTask.status === 'completed'} onChange={handleClickToggle} />
      <TextField
        fullWidth
        multiline
        value={currentTask.title}
        inputProps={{ style: { fontSize: 20, lineHeight: 1.3 } }}
      />
    </Box>
  )
}

export default Task
