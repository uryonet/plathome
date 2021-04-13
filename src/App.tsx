import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './lib/PrivateRoute'
import Home from './Home'
import Tasks from './features/tasks/Tasks'
import Notes from './Notes'

import { Container } from '@material-ui/core'
import Task from './features/tasks/Task'

const App: React.FC = () => {
  return (
    <Container className="container">
      <Switch>
        <PrivateRoute path="/tasks" component={Tasks} />
        <PrivateRoute path="/notes" component={Notes} />
        <Route path="/" component={Home} />
      </Switch>
    </Container>
  )
}

export default App
