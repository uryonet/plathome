import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchNotebook } from './notesSlice'
import { Container } from '@material-ui/core'

const Notes: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNotebook())
  }, [dispatch])

  return (
    <Container>
      <h1>ノートページ</h1>
    </Container>
  )
}

export default Notes
