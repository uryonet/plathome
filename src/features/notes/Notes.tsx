import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotebook, fetchSections, selectNotes } from './notesSlice'
import { Container } from '@material-ui/core'

const Notes: React.FC = () => {
  const dispatch = useDispatch()
  const { noteId } = useSelector(selectNotes)

  useEffect(() => {
    dispatch(fetchNotebook())
  }, [dispatch])

  useEffect(() => {
    if (noteId) {
      dispatch(fetchSections(noteId))
    }
  }, [dispatch, noteId])

  return (
    <Container>
      <h1>ノートページ</h1>
    </Container>
  )
}

export default Notes
