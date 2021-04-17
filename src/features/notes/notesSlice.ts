import { OnenotePage, OnenoteSection } from 'microsoft-graph'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/rootReducer'
import { AppThunk } from '../../app/store'
import { getNotebook, postNotebook } from '../../lib/GraphService'

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

export const fetchNotebook = (): AppThunk => async (dispatch) => {
  try {
    const notebooks = await getNotebook()
    if (notebooks.length === 0) {
      const newNote = await postNotebook()
      notebooks.push(newNote)
    }
    if (notebooks[0].id) {
      dispatch(setNoteId(notebooks[0].id))
    }
  } catch (e) {
    console.log(e)
  }
}
