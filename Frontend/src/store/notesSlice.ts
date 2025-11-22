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

export const updateNote = createAsyncThunk(
  "notes/update",
  async (payload: { id: string; title: string; content: string; createdAt: string; updatedAt?: string | null }, { rejectWithValue }) => {
    try {
      const note = await noteService.update(payload.id, {
        title: payload.title,
        content: payload.content,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
      });
      return note;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update note"
      );
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await noteService.remove(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete note"
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
      })
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(note => note.id !== action.payload);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedNoteId } = notesSlice.actions;
export default notesSlice.reducer;


