import React, { useState, useEffect } from 'react';
import './EditNoteModal.scss';
import type { Note } from '../../types/note';

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, title: string, content: string, createdAt: string, updatedAt?: string | null) => void;
  note: Note | null;
  loading?: boolean;
  error?: string | null;
}

const MAX_TITLE_LENGTH = 40;
const MAX_CONTENT_LENGTH = 1000;

export const EditNoteModal: React.FC<EditNoteModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  note,
  loading = false,
  error = null,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    content?: string;
  }>({});

  useEffect(() => {
    if (note && isOpen) {
      setTitle(note.title);
      setContent(note.content);
      setValidationErrors({});
    }
  }, [note, isOpen]);

  // clear form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setContent('');
      setValidationErrors({});
    }
  }, [isOpen]);

  // clear validation errors when user types
  useEffect(() => {
    if (validationErrors.title && title.trim().length > 0 && title.length <= MAX_TITLE_LENGTH) {
      setValidationErrors(prev => ({ ...prev, title: undefined }));
    }
  }, [title, validationErrors.title]);

  useEffect(() => {
    if (validationErrors.content && content.trim().length > 0 && content.length <= MAX_CONTENT_LENGTH) {
      setValidationErrors(prev => ({ ...prev, content: undefined }));
    }
  }, [content, validationErrors.content]);

  if (!isOpen || !note) return null;

  const validateForm = (): boolean => {
    const errors: { title?: string; content?: string } = {};

    if (!title.trim()) {
      errors.title = 'Title is required';
    } else if (title.length > MAX_TITLE_LENGTH) {
      errors.title = `Title must be no more than ${MAX_TITLE_LENGTH} characters`;
    }

    if (!content.trim()) {
      errors.content = 'Content is required';
    } else if (content.length > MAX_CONTENT_LENGTH) {
      errors.content = `Content must be no more than ${MAX_CONTENT_LENGTH} characters`;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(
        note.id,
        title.trim(),
        content.trim(),
        note.createdAt,
        note.updatedAt
      );
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <div className="edit-note-modal-overlay" onClick={handleClose}>
      <div className="edit-note-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-note-modal-header">
          <h2>Edit Note</h2>
          <button
            className="edit-note-modal-close"
            onClick={handleClose}
            disabled={loading}
            title="Close"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="edit-note-form">
          <div className="form-group">
            <label htmlFor="edit-note-title">
              Title
              <span className="char-count">
                {title.length}/{MAX_TITLE_LENGTH}
              </span>
            </label>
            <input
              id="edit-note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              maxLength={MAX_TITLE_LENGTH}
              disabled={loading}
              className={validationErrors.title ? 'error' : ''}
            />
            {validationErrors.title && (
              <span className="field-error">{validationErrors.title}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="edit-note-content">
              Content
              <span className="char-count">
                {content.length}/{MAX_CONTENT_LENGTH}
              </span>
            </label>
            <textarea
              id="edit-note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              rows={8}
              maxLength={MAX_CONTENT_LENGTH}
              disabled={loading}
              className={validationErrors.content ? 'error' : ''}
            />
            {validationErrors.content && (
              <span className="field-error">{validationErrors.content}</span>
            )}
          </div>
          {error && (
            <div className="form-error">
              <span className="error-icon">⚠</span>
              <span className="error-message">{error}</span>
            </div>
          )}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !title.trim() || !content.trim() || title.length > MAX_TITLE_LENGTH || content.length > MAX_CONTENT_LENGTH}
              className="submit-button"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

