import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreatePage, fetchCreateSection, selectNotes } from './notesSlice'
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
import { useParams } from 'react-router-dom'

interface ParamsType {
  sectionId: string
}

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

const NewPageDialog: React.FC = () => {
  const dispatch = useDispatch()
  const { sectionId } = useParams<ParamsType>()
  const [open, setOpen] = useState(false)
  const [inputPage, setInputPage] = useState('')
  const styles = useStyles()

  const changeInputPage = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPage(event.target.value)
  }

  const handleClickAdd = () => {
    setOpen(true)
  }

  const handleClickDialogAdd = () => {
    if (inputPage) {
      dispatch(fetchCreatePage(sectionId, inputPage))
    }
    setOpen(false)
    setInputPage('')
  }

  return (
    <>
      <Fab className={styles.fabButton} color="secondary" onClick={handleClickAdd}>
        <Add />
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>ページ追加</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField onChange={changeInputPage} />
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

export default NewPageDialog
