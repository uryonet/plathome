import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { Button, Box } from '@material-ui/core'

const Home: React.FC = () => {
  const { instance } = useMsal()

  return (
    <Box className="home">
      <h1>plathome</h1>
      <Box className="home-content">
        <AuthenticatedTemplate>
          <p>ログインしています。</p>
          <Button variant="contained" color="secondary" onClick={() => instance.logoutRedirect()}>
            ログアウト
          </Button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <p>ログインしていません。</p>
          <Button variant="contained" color="primary" onClick={() => instance.loginRedirect()}>
            ログイン
          </Button>
        </UnauthenticatedTemplate>
      </Box>
    </Box>
  )
}

export default Home
