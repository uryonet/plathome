import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch, Switch } from 'react-router-dom'
import PrivateRoute from '../../lib/PrivateRoute'
import { fetchNotebook, fetchPages, fetchSections, selectNotes } from './notesSlice'
import { Box, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'

const Notes: React.FC = () => {
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const history = useHistory()
  const { noteId, sections, pages } = useSelector(selectNotes)

  useEffect(() => {
    dispatch(fetchNotebook())
  }, [dispatch])

  useEffect(() => {
    if (noteId) {
      dispatch(fetchSections(noteId))
    }
  }, [dispatch, noteId])

  const handleClickSection = (sectionId: string | undefined) => () => {
    if (sectionId) {
      history.push(`${match.url}/${sectionId}`)
      dispatch(fetchPages(sectionId))
    }
  }

  const sectionsList = sections.map((section) => (
    <ListItem key={section.id} button onClick={handleClickSection(section.id)}>
      <ListItemText primary={section.displayName} />
      <ListItemSecondaryAction>
        <KeyboardArrowRight />
      </ListItemSecondaryAction>
    </ListItem>
  ))

  const pagesList = pages.map((page) => (
    <ListItem key={page.id} button onClick={() => history.push(`${match.url}/pages/${page.id}`)}>
      <ListItemText primary={page.title} />
      <ListItemSecondaryAction>
        <KeyboardArrowRight />
      </ListItemSecondaryAction>
    </ListItem>
  ))

  return (
    <Box className="notes">
      <h1>ノートページ</h1>
      <Switch>
        <PrivateRoute exact path={`${match.path}/:sectionId`}>
          <h4>ページ</h4>
          <Paper square>
            <List>{pagesList}</List>
          </Paper>
        </PrivateRoute>
        <PrivateRoute exact path={match.path}>
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
