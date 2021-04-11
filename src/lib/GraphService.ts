import * as graph from '@microsoft/microsoft-graph-client'
import { TodoTask, TodoTaskList, User } from 'microsoft-graph'
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

export const getTaskLists = async (): Promise<TodoTaskList[]> => {
  const client = await getAuthClient()
  const res =  await client.api('/me/todo/lists').get()
  return res.value
}

export const getTasks = async (listId: string | undefined): Promise<TodoTask[]> => {
  const client = await getAuthClient()
  const res =  await client.api('/me/todo/lists/' + listId + '/tasks').get()
  return res.value
}

export const postTask = async (listId: string | undefined): Promise<TodoTask> => {
  const client = await getAuthClient()
  const res =  await client.api('/me/todo/lists/' + listId + '/tasks').get()
  return res.value
}
