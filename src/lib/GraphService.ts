import * as graph from '@microsoft/microsoft-graph-client'
import { User } from 'microsoft-graph'
import { getToken } from './AuthService'

const getAuthClient = async () => {
  const token = await getToken()
  return graph.Client.init({
    authProvider: (done) => done(null, token)
  })
}

export const getUserDetails = async (): Promise<User> => {
  const client = await getAuthClient()
  return await client.api('/me').get()
}
