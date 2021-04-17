import { OnenotePage, OnenoteSection } from 'microsoft-graph'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/rootReducer'

type NotesState = {
  noteId: string
  sections: OnenoteSection[]
  pages: OnenotePage[]
}

const initialState: NotesState = {
  noteId: '',
  sections: [],
  pages: []
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNoteId: (state, action: PayloadAction<string>) => {
      state.noteId = action.payload
    },
    setSections: (state, action: PayloadAction<OnenoteSection[]>) => {
      state.sections = action.payload
    },
    setPages: (state, action: PayloadAction<OnenotePage[]>) => {
      state.pages = action.payload
    }
  }
})

export const { setNoteId, setSections, setPages } = notesSlice.actions
export default notesSlice.reducer

export const selectNotes = (state: RootState) => state.notes


