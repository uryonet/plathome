import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store'

import App from './App'
import MainAppBar from './components/MainAppBar'
import reportWebVitals from './reportWebVitals'

import { MsalProvider, AuthenticatedTemplate } from '@azure/msal-react'
import { PublicClientApplication, Configuration } from '@azure/msal-browser'

import './index.css'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { blue, pink } from '@material-ui/core/colors'

const azureConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID as string,
    authority: 'https://login.microsoftonline.com/' + process.env.REACT_APP_AZURE_TENANT_ID
  }
}
const pca = new PublicClientApplication(azureConfig)

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[200]
    },
    secondary: {
      main: pink[200]
    },
    type: 'dark'
  }
})

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <ThemeProvider theme={materialTheme}>
        <Provider store={store}>
          <BrowserRouter>
            <CssBaseline />
            <App />
            <AuthenticatedTemplate>
              <MainAppBar />
            </AuthenticatedTemplate>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
