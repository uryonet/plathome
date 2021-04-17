import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { fetchNotebook, fetchSections, selectNotes } from './notesSlice'
import { Container, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'

const Notes: React.FC = () => {
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const history = useHistory()
  const { noteId, sections } = useSelector(selectNotes)

  useEffect(() => {
    dispatch(fetchNotebook())
  }, [dispatch])

  useEffect(() => {
    if (noteId) {
      dispatch(fetchSections(noteId))
    }
  }, [dispatch, noteId])

  const sectionsList = sections.map((section) => (
    <ListItem key={section.id} button onClick={() => history.push(`${match.url}/${section.id}`)}>
      <ListItemText primary={section.displayName} />
      <ListItemSecondaryAction>
        <KeyboardArrowRight />
      </ListItemSecondaryAction>
    </ListItem>
  ))

  return (
    <Container>
      <h1>ノートページ</h1>
      <h4>セクション</h4>
      <Paper square>
        <List>{sectionsList}</List>
      </Paper>
    </Container>
  )
}

export default Notes
