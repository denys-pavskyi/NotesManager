import React, { useState, useEffect } from 'react';
import './CreateNoteModal.scss';

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
  loading?: boolean;
  error?: string | null;
}

const MAX_TITLE_LENGTH = 40;
const MAX_CONTENT_LENGTH = 1000;

export const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
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
    if (!isOpen) {
      setTitle('');
      setContent('');
      setValidationErrors({});
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

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
      onSubmit(title.trim(), content.trim());
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <div className="create-note-modal-overlay" onClick={handleClose}>
      <div className="create-note-modal" onClick={(e) => e.stopPropagation()}>
        <div className="create-note-modal-header">
          <h2>Create New Note</h2>
          <button
            className="create-note-modal-close"
            onClick={handleClose}
            disabled={loading}
            title="Close"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="create-note-form">
          <div className="form-group">
            <label htmlFor="note-title">
              Title
              <span className="char-count">
                {title.length}/{MAX_TITLE_LENGTH}
              </span>
            </label>
            <input
              id="note-title"
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
            <label htmlFor="note-content">
              Content
              <span className="char-count">
                {content.length}/{MAX_CONTENT_LENGTH}
              </span>
            </label>
            <textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              rows={6}
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
              {loading ? 'Creating...' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

