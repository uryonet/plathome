import React, { ChangeEvent, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'

export interface NewTaskDialogProps {
  open: boolean
  onClose: (value: string) => void
}

const NewTaskDialog: React.FC<NewTaskDialogProps> = (props) => {
  const { open, onClose } = props
  const [inputTask, setInputTask] = useState('')

  const changeInputTask = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTask(event.target.value)
  }

  const handleClickAdd = () => {
    onClose(inputTask)
    setInputTask('')
  }

  return (
    <Dialog open={open}>
      <DialogTitle>新規タスク登録</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <TextField label="新規タスク" onChange={changeInputTask} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClickAdd}>
          追加
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewTaskDialog
