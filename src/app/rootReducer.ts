import { combineReducers } from '@reduxjs/toolkit'
import { tasksSlice } from '../features/tasks/tasksSlice'
import { notesSlice } from '../features/notes/notesSlice'

const rootReducer = combineReducers({
  tasks: tasksSlice.reducer,
  notes: notesSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
