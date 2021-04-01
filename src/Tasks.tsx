import React from 'react'
import { Box, Fab, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'

const useStyles = makeStyles({
  taskFabButton: {
    position: 'absolute',
    bottom: 28,
    left: 0,
    right: 0,
    zIndex: 20,
    margin: 'auto'
  }
})

const Tasks: React.FC = () => {
  const styles = useStyles()
  return (
    <Box className="home">
      <h1>タスク</h1>
      <Fab color="secondary" className={styles.taskFabButton}>
        <Add />
      </Fab>
    </Box>
  )
}

export default Tasks
