import React from 'react'
import { useSelector } from 'react-redux'
import { selectTasks } from './tasksSlice'
import { Box } from '@material-ui/core'

const Tasks: React.FC = () => {
  const { tasksList } = useSelector(selectTasks)

  const renderTaskList: JSX.Element[] = []
  tasksList.map((task) => {
    return renderTaskList.push(<p>{task.title}</p>)
  })

  return (
    <Box className="home">
      <h1>タスク</h1>
      {renderTaskList}
    </Box>
  )
}

export default Tasks
