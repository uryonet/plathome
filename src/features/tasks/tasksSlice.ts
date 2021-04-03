import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/rootReducer'

type Task = {
  title: string
}

type TasksState = {
  tasksList: Task[]
}

const initialState: TasksState = {
  tasksList: []
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const task: Task = { title: action.payload }
      state.tasksList.push(task)
    }
  }
})

export const { addTask } = tasksSlice.actions
export default tasksSlice.reducer

export const selectTasks = (state: RootState) => state.tasks
