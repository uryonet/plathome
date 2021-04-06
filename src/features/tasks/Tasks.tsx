import React from 'react'
import { useSelector } from 'react-redux'
import { selectTasks } from './tasksSlice'
import { Box, Divider, List, ListItem, ListItemText, Paper } from '@material-ui/core'

const Tasks: React.FC = () => {
  const { tasksList } = useSelector(selectTasks)

  const renderTaskList: JSX.Element[] = []
  tasksList.map((task, index) => {
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
      <Paper square>{tasksList.length !== 0 && <List>{renderTaskList}</List>}</Paper>
    </Box>
  )
}

export default Tasks
