import React, { useState } from 'react'
import { Box, Fab, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import NewTaskDialog from './components/NewTaskDialog'

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
  const [open, setOpen] = useState(false)
  const [taskValue, setTaskValue] = useState('')
  const styles = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setTaskValue(value)
  }

  return (
    <Box className="home">
      <h1>タスク</h1>
      <p>{taskValue}</p>
      <Fab className={styles.taskFabButton} color="secondary" onClick={handleClickOpen}>
        <Add />
      </Fab>
      <NewTaskDialog open={open} onClose={handleClose} />
    </Box>
  )
}

export default Tasks
