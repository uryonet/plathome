import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch, Switch } from 'react-router-dom'
import PrivateRoute from '../../lib/PrivateRoute'
import Pages from './Pages'
import { fetchNotebook, fetchSections, selectNotes } from './notesSlice'
import { Box, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
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
    <Box className="notes">
      <Switch>
        <PrivateRoute exact path={`${match.path}/:sectionId`}>
          <Pages />
        </PrivateRoute>
        <PrivateRoute exact path={match.path}>
          <h1>ノートページ</h1>
          <h4>セクション</h4>
          <Paper square>
            <List>{sectionsList}</List>
          </Paper>
        </PrivateRoute>
      </Switch>
    </Box>
  )
}

export default Notes
