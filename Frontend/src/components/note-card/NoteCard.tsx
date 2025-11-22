import React from 'react';
import type { Note } from '../../types/note';
import './NoteCard.scss';
import binIcon from '../../assets/bin.png';

interface NoteCardProps {
  note: Note;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

const CONTENT_PREVIEW_LENGTH = 150;

export const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, isDeleting = false }) => {
  const contentPreview = note.content.length > CONTENT_PREVIEW_LENGTH 
    ? note.content.substring(0, CONTENT_PREVIEW_LENGTH) + '...'
    : note.content;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && !isDeleting) {
      onDelete(note.id);
    }
  };

  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-card-title">{note.title}</h3>
        {onDelete && (
          <button
            className="note-card-delete"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete note"
          >
            <img src={binIcon} alt="Delete" className="delete-icon" />
          </button>
        )}
      </div>
      <p className="note-card-content">{contentPreview}</p>
      <small className="note-card-date">
        {new Date(note.updatedAt ?? note.createdAt).toLocaleDateString()}
      </small>
    </div>
  );
};
