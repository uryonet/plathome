import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { fetchPages, selectNotes } from './notesSlice'
import { OnenoteSection } from 'microsoft-graph'
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
  const { sections, pages } = useSelector(selectNotes)
  const [currentSection, setCurrentSection] = useState<OnenoteSection>({})

  useEffect(() => {
    dispatch(fetchPages(sectionId))
    const findSection = sections.find((section) => section.id === sectionId)
    if (findSection) {
      setCurrentSection(findSection)
    }
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
      <h1>{currentSection.displayName}</h1>
      <h4>ページ</h4>
      <Paper square>
        <List>{pagesList}</List>
      </Paper>
    </React.Fragment>
  )
}

export default Pages
