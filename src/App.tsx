import React from 'react'
import logo from './logo.svg'

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'

import './App.css'
import { Button } from '@material-ui/core'

const App: React.FC = () => {
  const { instance } = useMsal()
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <AuthenticatedTemplate>
          <p>ログインしています。</p>
          <Button variant='contained' color='secondary' onClick={() => instance.logoutRedirect()}>ログアウト</Button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <p>ログインしていません。</p>
          <Button variant='contained' color='primary' onClick={() => instance.loginRedirect()}>ログイン</Button>
        </UnauthenticatedTemplate>
      </header>
    </div>
  )
}

export default App
