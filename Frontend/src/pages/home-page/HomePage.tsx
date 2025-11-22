import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchAllNotes, createNote, deleteNote, updateNote } from '../../store/notesSlice';
import type { Note } from '../../types/note';
import { NoteCard } from '../../components/note-card/NoteCard';
import { NoteFormModal } from '../../components/note-form/NoteFormModal';
import { ConfirmModal } from '../../components/confirm-modal/ConfirmModal';
import refreshIcon from '../../assets/refresh-page-option.png';
import addPostIcon from '../../assets/add-post.png';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: notes, loading, error } = useAppSelector(state => state.notes);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    dispatch(fetchAllNotes());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAllNotes());
  };

  const handleFormSubmit = async (title: string, content: string, note?: Note) => {
    const action = note
      ? updateNote({ id: note.id, title, content, createdAt: note.createdAt, updatedAt: note.updatedAt })
      : createNote({ title, content });
    
    const result = await dispatch(action);
    
    if ((note ? updateNote : createNote).fulfilled.match(result)) {
      if (note) {
        setNoteToEdit(null);
      } else {
        setIsCreateModalOpen(false);
      }
      dispatch(fetchAllNotes());
    }
  };

  const handleDeleteClick = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) setNoteToDelete({ id: note.id, title: note.title });
  };

  const handleDeleteConfirm = async () => {
    if (!noteToDelete) return;
    const result = await dispatch(deleteNote(noteToDelete.id));
    if (deleteNote.fulfilled.match(result)) {
      setNoteToDelete(null);
      dispatch(fetchAllNotes());
    }
  };

  return (
    <div className="home-page">
      <div className="home-page-header">
        <button 
          className="refresh-button" 
          onClick={handleRefresh}
          title="Refresh notes"
          disabled={loading}
        >
          <img src={refreshIcon} alt="Refresh" className="refresh-icon" />
        </button>
        <h2>Notes ({notes.length})</h2>
      </div>

      <button
        className="create-note-button"
        onClick={() => setIsCreateModalOpen(true)}
        title="Create new note"
        disabled={loading}
      >
        <img src={addPostIcon} alt="Create note" className="create-note-icon" />
        <span>Create Note</span>
      </button>

      <NoteFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleFormSubmit}
        loading={loading}
        error={error}
        mode="create"
      />

      <NoteFormModal
        isOpen={!!noteToEdit}
        onClose={() => setNoteToEdit(null)}
        onSubmit={handleFormSubmit}
        note={noteToEdit}
        loading={loading}
        error={error}
        mode="edit"
      />

      <ConfirmModal
        isOpen={!!noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Note"
        message={`Are you sure you want to delete "${noteToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={loading}
      />

      {loading && (
        <div className="loading">Loading notes...</div>
      )}

      {error && (
        <div className="error">Error: {error}</div>
      )}

      {!loading && !error && (
        <>
          {notes.length === 0 ? (
            <p className="no-notes">No notes yet. Create your first note!</p>
          ) : (
            <ul className="notes-list">
              {notes.map((note: Note) => (
                <li key={note.id} className="notes-list-item">
                  <NoteCard 
                    note={note} 
                    onDelete={handleDeleteClick}
                    onEdit={(note) => setNoteToEdit(note)}
                    isDeleting={loading}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;