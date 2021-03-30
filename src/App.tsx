import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './lib/PrivateRoute'
import Home from './Home'
import Tasks from './Tasks'
import Notes from './Notes'

import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
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
    </div>
  )
}

export default App
