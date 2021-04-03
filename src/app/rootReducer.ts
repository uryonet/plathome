import { combineReducers } from '@reduxjs/toolkit'
import { tasksSlice } from '../features/tasks/tasksSlice'

const rootReducer = combineReducers({
  tasks: tasksSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
