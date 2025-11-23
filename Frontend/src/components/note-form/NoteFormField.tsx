import React from 'react';
import type { NoteValidationErrors } from '../../consts/noteValidation';

interface NoteFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  type?: 'text' | 'textarea';
}

export const NoteFormField: React.FC<NoteFormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  maxLength,
  error,
  disabled = false,
  placeholder,
  rows = 6,
  type = 'text',
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        <span className="char-count">
          {value.length}/{maxLength}
        </span>
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          className={error ? 'error' : ''}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className={error ? 'error' : ''}
        />
      )}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

