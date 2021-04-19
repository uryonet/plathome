import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateSection, selectNotes } from './notesSlice'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  makeStyles,
  TextField
} from '@material-ui/core'
import { Add } from '@material-ui/icons'

const useStyles = makeStyles({
  fabButton: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    zIndex: 1
  }
})

const NewSectionDialog: React.FC = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [inputSection, setInputSection] = useState('')
  const { noteId } = useSelector(selectNotes)
  const styles = useStyles()

  const changeInputSection = (event: ChangeEvent<HTMLInputElement>) => {
    setInputSection(event.target.value)
  }

  const handleClickAdd = () => {
    setOpen(true)
  }

  const handleClickDialogAdd = () => {
    if (inputSection) {
      dispatch(fetchCreateSection(noteId, inputSection))
    }
    setOpen(false)
    setInputSection('')
  }

  return (
    <>
      <Fab className={styles.fabButton} color="secondary" onClick={handleClickAdd}>
        <Add />
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>セクション追加</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField onChange={changeInputSection} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClickDialogAdd}>
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewSectionDialog
