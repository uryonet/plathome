import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchToggleStatus, selectTasks } from './tasksSlice'

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
  const dispatch = useDispatch()
  const styles = useStyles()

  useEffect(() => {
    console.log('タスク詳細ページ初期化処理')
    const selectedTask = tasks.find((task) => task.id === taskId)
    if (selectedTask) {
      setCurrentTask(selectedTask)
    }
  }, [taskId, tasks])

  const handleClickToggle = () => {
    dispatch(fetchToggleStatus(taskListId, currentTask))
    const task = { ...currentTask }
    task.status = currentTask.status === 'completed' ? 'notStarted' : 'completed'
    setCurrentTask(task)
  }

  const handleSendBtn = () => {
    console.log('send button')
  }

  const handleDelBtn = () => {
    console.log('del button')
  }

  return (
    <Box className="task-detail">
      <Box className="task-detail-info" display="flex">
        <Checkbox edge="start" checked={currentTask.status === 'completed'} onChange={handleClickToggle} />
        <TextField
          fullWidth
          multiline
          value={currentTask.title}
          inputProps={{ style: { fontSize: 20, lineHeight: 1.3 } }}
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
