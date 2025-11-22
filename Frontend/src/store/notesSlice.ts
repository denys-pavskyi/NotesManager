import type { Note } from "../types/note";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

const handleAsyncError = (error: unknown, defaultMessage: string): string => {
  return error instanceof Error ? error.message : defaultMessage;
};

export const fetchAllNotes = createAsyncThunk(
  "notes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await noteService.getAll();
    } catch (error) {
      return rejectWithValue(handleAsyncError(error, "Failed to fetch notes"));
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/create",
  async (payload: { title: string; content: string }, { rejectWithValue }) => {
    try {
      return await noteService.create(payload);
    } catch (error) {
      return rejectWithValue(handleAsyncError(error, "Failed to create note"));
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/update",
  async (payload: { id: string; title: string; content: string; createdAt: string; updatedAt?: string | null }, { rejectWithValue }) => {
    try {
      return await noteService.update(payload.id, {
        title: payload.title,
        content: payload.content,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
      });
    } catch (error) {
      return rejectWithValue(handleAsyncError(error, "Failed to update note"));
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
      return rejectWithValue(handleAsyncError(error, "Failed to delete note"));
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
    const handlePending = (state: NotesState) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state: NotesState, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    };

    builder
      .addCase(fetchAllNotes.pending, handlePending)
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllNotes.rejected, handleRejected)
      .addCase(createNote.pending, handlePending)
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createNote.rejected, handleRejected)
      .addCase(updateNote.pending, handlePending)
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateNote.rejected, handleRejected)
      .addCase(deleteNote.pending, handlePending)
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(note => note.id !== action.payload);
      })
      .addCase(deleteNote.rejected, handleRejected);
  },
});

export const { clearError, setSelectedNoteId } = notesSlice.actions;
export default notesSlice.reducer;


