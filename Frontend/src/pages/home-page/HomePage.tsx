import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          title={t('notes.refreshNotes')}
          disabled={loading}
        >
          <img src={refreshIcon} alt={t('notes.refreshNotes')} className="refresh-icon" />
        </button>
        <h2>{t('notes.title')} ({notes.length})</h2>
      </div>

      <button
        className="create-note-button"
        onClick={() => setIsCreateModalOpen(true)}
        title={t('notes.createNewNoteTooltip')}
        disabled={loading}
      >
        <img src={addPostIcon} alt={t('notes.createNote')} className="create-note-icon" />
        <span>{t('notes.createNote')}</span>
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
        title={t('notes.deleteNote')}
        message={t('notes.deleteConfirmation', { title: noteToDelete?.title })}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        loading={loading}
      />

      {loading && (
        <div className="loading" data-testid="loading">{t('notes.loadingNotes')}</div>
      )}

      {error && (
        <div className="error" data-testid="error">{t('common.error')}: {error}</div>
      )}

      {!loading && !error && (
        <>
          {notes.length === 0 ? (
            <p className="no-notes">{t('notes.noNotes')}</p>
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