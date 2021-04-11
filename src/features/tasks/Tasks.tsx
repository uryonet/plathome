import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, selectTasks } from './tasksSlice'
import { Box, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core'

const Tasks: React.FC = () => {
  const dispatch = useDispatch()
  const { tasks } = useSelector(selectTasks)

  useEffect(() => {
    console.log('タスク一覧の取得処理')
    dispatch(fetchTasks())
  }, [])

  const renderTaskList = (completed: boolean) => {
    const render: JSX.Element[] = []
    tasks.map((task) => {
      if ((task.status === 'completed') === completed) {
        return render.push(
          <ListItem key={task.id} dense button>
            <ListItemIcon>
              <Checkbox edge='start' checked={task.status === 'completed'} />
            </ListItemIcon>
            <ListItemText primary={task.title} />
          </ListItem>
        )
      }
    })
    return render
  }

  return (
    <Box className='task'>
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
