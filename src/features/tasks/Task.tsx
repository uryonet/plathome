import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchDelTask, fetchUpdateTask, selectTasks } from './tasksSlice'
import { TodoTask } from 'microsoft-graph'
import {
  Box,
  Button,
  Checkbox,
  createStyles,
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
  TextField
} from '@material-ui/core'
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
  const dispatch = useDispatch()
  const history = useHistory()
  const { taskId } = useParams<ParamTypes>()
  const { taskListId, tasks } = useSelector(selectTasks)
  const [currentTask, setCurrentTask] = useState<TodoTask>({})
  const [updateTask, setUpdateTask] = useState<TodoTask>({})
  const [open, setOpen] = useState(false)
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
    if (updateTask.id) {
      dispatch(fetchDelTask(taskListId, updateTask.id))
      history.goBack()
    }
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
          onClick={() => setOpen(true)}
        >
          削除
        </Button>
      </Box>
      <Dialog open={open}>
        <DialogTitle>タスクを削除しますか？</DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={handleDelBtn}>
            はい
          </Button>
          <Button onClick={() => setOpen(false)}>いいえ</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Task
