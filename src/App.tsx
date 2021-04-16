import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './lib/PrivateRoute'
import Home from './Home'
import Tasks from './features/tasks/Tasks'
import Notes from './Notes'

import { Container } from '@material-ui/core'

const App: React.FC = () => {
  return (
    <Container className="container">
      <Switch>
        <PrivateRoute path="/tasks">
          <Tasks />
        </PrivateRoute>
        <PrivateRoute path="/notes">
          <Notes />
        </PrivateRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
