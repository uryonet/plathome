import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, selectTasks } from './tasksSlice'
import { Box, Divider, List, ListItem, ListItemText, Paper } from '@material-ui/core'

const Tasks: React.FC = () => {
  const dispatch = useDispatch()
  const { taskListId, tasks } = useSelector(selectTasks)

  useEffect(() => {
    console.log('タスク一覧の取得処理')
    dispatch(fetchTasks())
  }, [])

  const renderTaskList: JSX.Element[] = []
  tasks.map((task, index) => {
    return renderTaskList.push(
      <React.Fragment key={task.id}>
        {index !== 0 && <Divider />}
        <ListItem>
          <ListItemText primary={task.title} />
        </ListItem>
      </React.Fragment>
    )
  })

  return (
    <Box className="home">
      <h1>Tasks</h1>
      <Paper square>{tasks.length !== 0 && <List>{renderTaskList}</List>}</Paper>
    </Box>
  )
}

export default Tasks
