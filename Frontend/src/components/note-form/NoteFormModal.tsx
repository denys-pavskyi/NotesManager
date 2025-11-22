import React, { useState, useEffect } from 'react';
import './NoteFormModal.scss';
import type { Note } from '../../types/note';
import { NoteFormField } from './NoteFormField';
import {
  MAX_TITLE_LENGTH,
  MAX_CONTENT_LENGTH,
  validateNoteForm,
  isNoteFormValid,
  type NoteValidationErrors,
} from '../../consts/noteValidation';

interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string, note?: Note) => void;
  note?: Note | null;
  loading?: boolean;
  error?: string | null;
  mode: 'create' | 'edit';
}

export const NoteFormModal: React.FC<NoteFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  note,
  loading = false,
  error = null,
  mode,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationErrors, setValidationErrors] = useState<NoteValidationErrors>({});

  // reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setContent('');
      setValidationErrors({});
    } else if (mode === 'edit' && note) {
      setTitle(note.title);
      setContent(note.content);
      setValidationErrors({});
    } else if (mode === 'create') {
      setTitle('');
      setContent('');
      setValidationErrors({});
    }
  }, [isOpen, mode, note]);

  useEffect(() => {
    setValidationErrors((prev) => {
      const errors = validateNoteForm(title, content);
      const newErrors: NoteValidationErrors = {};
      
      if (prev.title && errors.title) {
        newErrors.title = errors.title;
      }
      if (prev.content && errors.content) {
        newErrors.content = errors.content;
      }
      
      return newErrors;
    });
  }, [title, content]);

  if (!isOpen) return null;
  if (mode === 'edit' && !note) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateNoteForm(title, content);
    setValidationErrors(errors);
    
    if (isNoteFormValid(title, content)) {
      onSubmit(title.trim(), content.trim(), note || undefined);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const modalTitle = mode === 'create' ? 'Create New Note' : 'Edit Note';
  const submitText = loading 
    ? (mode === 'create' ? 'Creating...' : 'Saving...')
    : (mode === 'create' ? 'Create Note' : 'Save Changes');
  const isSubmitDisabled = loading || !isNoteFormValid(title, content);
  const textareaRows = mode === 'edit' ? 8 : 6;

  return (
    <div className="note-form-modal-overlay" onClick={handleClose}>
      <div className="note-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="note-form-modal-header">
          <h2>{modalTitle}</h2>
          <button
            className="note-form-modal-close"
            onClick={handleClose}
            disabled={loading}
            title="Close"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="note-form-form">
          <NoteFormField
            id={`note-${mode}-title`}
            label="Title"
            value={title}
            onChange={setTitle}
            maxLength={MAX_TITLE_LENGTH}
            error={validationErrors.title}
            disabled={loading}
            placeholder="Enter note title"
            type="text"
          />
          <NoteFormField
            id={`note-${mode}-content`}
            label="Content"
            value={content}
            onChange={setContent}
            maxLength={MAX_CONTENT_LENGTH}
            error={validationErrors.content}
            disabled={loading}
            placeholder="Enter note content"
            rows={textareaRows}
            type="textarea"
          />
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
              disabled={isSubmitDisabled}
              className="submit-button"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

