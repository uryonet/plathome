import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react'

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuth = useIsAuthenticated()
  return (
    <Route
      {...rest}
      render={({ location }) => (isAuth ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />)}
    />
  )
}

export default PrivateRoute
