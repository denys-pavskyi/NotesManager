import React, { useEffect } from 'react';
import './HomePage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchAllNotes } from '../../store/notesSlice';
import type { Note } from '../../types/note';
import { NoteCard } from '../../components/note-card/NoteCard';
import refreshIcon from '../../assets/refresh-page-option.png';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: notes, loading, error } = useAppSelector(state => state.notes);

  useEffect(() => {
    dispatch(fetchAllNotes());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAllNotes());
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