import type { Note } from "../types/note";
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { noteService } from "../services/noteService";


interface NotesState {
  items: Note[];
  loading: boolean;
  error: string | null;
  selectedNoteId?: string | null;
}

const initialState: NotesState = {
  items: [],
  loading: false,
  error: null,
  selectedNoteId: null,
};

export const fetchAllNotes = createAsyncThunk(
  "notes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const notes = await noteService.getAll();
      return notes;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch notes"
      );
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/create",
  async (payload: { title: string; content: string }, { rejectWithValue }) => {
    try {
      const note = await noteService.create(payload);
      return note;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create note"
      );
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedNoteId: (state, action: PayloadAction<string | null>) => {
      state.selectedNoteId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedNoteId } = notesSlice.actions;
export default notesSlice.reducer;


