import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Switch, useRouteMatch } from 'react-router-dom'
import PrivateRoute from '../../lib/PrivateRoute'
import { fetchTasks, fetchUpdateTask, selectTasks } from './tasksSlice'
import Task from './Task'
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
  const match = useRouteMatch()
  const { taskListId, tasks } = useSelector(selectTasks)

  useEffect(() => {
    console.log('タスク一覧の取得処理')
    dispatch(fetchTasks())
  }, [dispatch])

  const handleClickToggle = (task: TodoTask) => () => {
    const updateTask = { ...task }
    updateTask.status = task.status === 'completed' ? 'notStarted' : 'completed'
    dispatch(fetchUpdateTask(taskListId, updateTask))
  }

  const renderTaskList = (completed: boolean) => {
    let render: JSX.Element[] = []
    tasks.map((task) => {
      return render.push(
        <React.Fragment key={task.id}>
          {(task.status === 'completed') === completed && (
            <ListItem button onClick={handleClickToggle(task)}>
              <ListItemIcon>
                <Checkbox edge="start" checked={task.status === 'completed'} />
              </ListItemIcon>
              <ListItemText primary={task.title} />
              <ListItemSecondaryAction>
                <Link to={`${match.url}/${task.id}`}>
                  <IconButton edge="end">
                    <KeyboardArrowRight />
                  </IconButton>
                </Link>
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
      <Switch>
        <PrivateRoute path={`${match.path}/:taskId`}>
          <Task />
        </PrivateRoute>
        <PrivateRoute path={match.path}>
          <h1>Tasks</h1>
          <Paper square>
            <List>{renderTaskList(false)}</List>
          </Paper>
          <h4>完了済み</h4>
          <Paper square>
            <List>{renderTaskList(true)}</List>
          </Paper>
        </PrivateRoute>
      </Switch>
    </Box>
  )
}

export default Tasks
