import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/rootReducer'
import { AppThunk } from '../../app/store'
import { getTaskLists, getTasks } from '../../lib/GraphService'
import { TodoTask } from 'microsoft-graph'

type TasksState = {
  tasks: TodoTask[]
}

const initialState: TasksState = {
  tasks: []
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TodoTask[]>) => {
      state.tasks = action.payload
    }
  }
})

export const { setTasks } = tasksSlice.actions
export default tasksSlice.reducer

export const selectTasks = (state: RootState) => state.tasks

export const fetchTasksList = (): AppThunk => async (dispatch) => {
  try {
    const taskLists = await getTaskLists()
    const tasks = await getTasks(taskLists[0].id)
    dispatch(setTasks(tasks))
  } catch (e) {
    console.log(e)
  }
}
