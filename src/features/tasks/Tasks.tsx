import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, fetchToggleStatus, selectTasks } from './tasksSlice'
import { TodoTask } from 'microsoft-graph'
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'

const Tasks: React.FC = () => {
  const dispatch = useDispatch()
  const { taskListId, tasks } = useSelector(selectTasks)

  useEffect(() => {
    console.log('タスク一覧の取得処理')
    dispatch(fetchTasks())
  }, [dispatch])

  const handleClickToggle = (task: TodoTask) => () => {
    dispatch(fetchToggleStatus(taskListId, task))
  }

  const renderTaskList = (completed: boolean) => {
    let render: JSX.Element[] = []
    tasks.map((task) => {
      return render.push(
        <React.Fragment key={task.id}>
          {(task.status === 'completed') === completed && (
            <ListItem dense button onClick={handleClickToggle(task)}>
              <ListItemIcon>
                <Checkbox edge="start" checked={task.status === 'completed'} />
              </ListItemIcon>
              <ListItemText primary={task.title} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <KeyboardArrowRight />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </React.Fragment>
      )
    })
    return render
  }

  return (
    <Box className="task">
      <h1>Tasks</h1>
      <Paper square>
        <List>{renderTaskList(false)}</List>
      </Paper>
      <h4>完了済み</h4>
      <Paper square>
        <List>{renderTaskList(true)}</List>
      </Paper>
    </Box>
  )
}

export default Tasks
