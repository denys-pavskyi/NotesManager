import React, { useState, useEffect } from 'react';
import './CreateNoteModal.scss';

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  error = null,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Clear form only when modal closes (happens on success or manual close)
  // This preserves form data when there's an error
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setContent('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
      // Don't clear form here - wait for success
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
            <label htmlFor="note-title">Title</label>
            <input
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="note-content">Content</label>
            <textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              rows={6}
              required
              disabled={loading}
            />
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
              disabled={loading || !title.trim() || !content.trim()}
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

