import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasksList, selectTasks } from './tasksSlice'
import { Box, Button, Divider, List, ListItem, ListItemText, Paper } from '@material-ui/core'

const Tasks: React.FC = () => {
  const dispatch = useDispatch()
  const { tasks } = useSelector(selectTasks)

  const onClickTestBtn = () => {
    dispatch(fetchTasksList())
  }

  const renderTaskList: JSX.Element[] = []
  tasks.map((task, index) => {
    return renderTaskList.push(
      <>
        {index !== 0 && <Divider />}
        <ListItem>
          <ListItemText primary={task.title} />
        </ListItem>
      </>
    )
  })

  return (
    <Box className="home">
      <h1>Tasks</h1>
      <Paper square>{tasks.length !== 0 && <List>{renderTaskList}</List>}</Paper>
      <Button onClick={onClickTestBtn}>テスト用ボタン</Button>
    </Box>
  )
}

export default Tasks
