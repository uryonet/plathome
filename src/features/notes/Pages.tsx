import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { fetchPages, selectNotes } from './notesSlice'
import { List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'

interface ParamTypes {
  sectionId: string
}

const Pages: React.FC = () => {
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const history = useHistory()
  const { sectionId } = useParams<ParamTypes>()
  const { pages } = useSelector(selectNotes)

  useEffect(() => {
    dispatch(fetchPages(sectionId))
  }, [dispatch, sectionId])

  const pagesList = pages.map((page) => (
    <ListItem key={page.id} button onClick={() => history.push(`${match.url}/pages/${page.id}`)}>
      <ListItemText primary={page.title} />
      <ListItemSecondaryAction>
        <KeyboardArrowRight />
      </ListItemSecondaryAction>
    </ListItem>
  ))

  return (
    <React.Fragment>
      <h4>ページ</h4>
      <Paper square>
        <List>{pagesList}</List>
      </Paper>
    </React.Fragment>
  )
}

export default Pages
