import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchAllNotes, createNote } from '../../store/notesSlice';
import type { Note } from '../../types/note';
import { NoteCard } from '../../components/note-card/NoteCard';
import { CreateNoteModal } from '../../components/create-note-modal/CreateNoteModal';
import refreshIcon from '../../assets/refresh-page-option.png';
import addPostIcon from '../../assets/add-post.png';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: notes, loading, error } = useAppSelector(state => state.notes);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllNotes());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAllNotes());
  };

  const handleCreateNote = async (title: string, content: string) => {
    const result = await dispatch(createNote({ title, content }));
    if (createNote.fulfilled.match(result)) {
      setIsCreateModalOpen(false);
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

      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateNote}
        loading={loading}
        error={error}
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
                  <NoteCard note={note} />
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