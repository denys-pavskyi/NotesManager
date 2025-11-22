import React, { useEffect } from 'react';
import './HomePage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchAllNotes } from '../../store/notesSlice';
import type { Note } from '../../types/note';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: notes, loading, error } = useAppSelector(state => state.notes);

  useEffect(() => {
    dispatch(fetchAllNotes());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading">Loading notes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <h2>Notes ({notes.length})</h2>
      {notes.length === 0 ? (
        <p className="no-notes">No notes yet. Create your first note!</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note: Note) => (
            <li key={note.id} className="note-item">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small>{new Date(note.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;