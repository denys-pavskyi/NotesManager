import React, { useEffect } from 'react';
import type { Note } from '../../types/note';
import './NoteCard.scss';

interface NoteCardProps {
  note: Note;
}

const CONTENT_PREVIEW_LENGTH = 150;

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  useEffect(() => {
    console.log('Note:', {
      title: note.title,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    });
  }, [note]);

  const contentPreview = note.content.length > CONTENT_PREVIEW_LENGTH 
    ? note.content.substring(0, CONTENT_PREVIEW_LENGTH) + '...'
    : note.content;

  return (
    <div className="note-card">
      <h3 className="note-card-title">{note.title}</h3>
      <p className="note-card-content">{contentPreview}</p>
      <small className="note-card-date">
        {new Date(note.updatedAt ?? note.createdAt).toLocaleDateString()}
      </small>
    </div>
  );
};
