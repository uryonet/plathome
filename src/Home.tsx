import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { Button, Container } from '@material-ui/core'

const Home: React.FC = () => {
  const { instance } = useMsal()

  return (
    <Container>
      <h1>ホームページ</h1>
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
    </Container>
  )
}

export default Home
