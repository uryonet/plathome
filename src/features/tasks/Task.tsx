import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUpdateTask, selectTasks } from './tasksSlice'
import { TodoTask } from 'microsoft-graph'
import { Box, Button, Checkbox, createStyles, makeStyles, TextField } from '@material-ui/core'
import { Delete, Send } from '@material-ui/icons'

interface ParamTypes {
  taskId: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
)

const Task: React.FC = () => {
  const { taskId } = useParams<ParamTypes>()
  const { taskListId, tasks } = useSelector(selectTasks)
  const [currentTask, setCurrentTask] = useState<TodoTask>({})
  const [updateTask, setUpdateTask] = useState<TodoTask>({})
  const dispatch = useDispatch()
  const styles = useStyles()

  useEffect(() => {
    const selectedTask = tasks.find((task) => task.id === taskId)
    if (selectedTask) {
      setCurrentTask(selectedTask)
      setUpdateTask(selectedTask)
    }
  }, [taskId, tasks])

  const handleClickToggle = () => {
    const task = { ...updateTask }
    task.status = updateTask.status === 'completed' ? 'notStarted' : 'completed'
    setUpdateTask(task)
  }

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const task = { ...updateTask }
    task.title = event.target.value
    setUpdateTask(task)
  }

  const handleSendBtn = () => {
    dispatch(fetchUpdateTask(taskListId, updateTask))
  }

  const handleDelBtn = () => {
    console.log('del button')
  }

  return (
    <Box className="task-detail">
      <Box className="task-detail-info" display="flex">
        <Checkbox edge="start" checked={updateTask.status === 'completed'} onChange={handleClickToggle} />
        <TextField
          fullWidth
          multiline
          value={updateTask.title}
          inputProps={{ style: { fontSize: 20, lineHeight: 1.3 } }}
          onChange={handleChangeTitle}
        />
      </Box>
      <Box>
        <Button
          className={styles.button}
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<Send />}
          onClick={handleSendBtn}
          disabled={JSON.stringify(currentTask) === JSON.stringify(updateTask)}
        >
          更新
        </Button>
        <Button
          className={styles.button}
          fullWidth
          variant="outlined"
          color="secondary"
          startIcon={<Delete />}
          onClick={handleDelBtn}
        >
          削除
        </Button>
      </Box>
    </Box>
  )
}

export default Task
