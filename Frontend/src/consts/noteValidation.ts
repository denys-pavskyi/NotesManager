import i18n from '../i18n/config';

export const MAX_TITLE_LENGTH = 40;
export const MAX_CONTENT_LENGTH = 1000;

export interface NoteValidationErrors {
  title?: string;
  content?: string;
}

export const validateNoteTitle = (title: string): string | undefined => {
  if (!title.trim()) {
    return i18n.t('validation.titleRequired');
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return i18n.t('validation.titleMaxLength', { max: MAX_TITLE_LENGTH });
  }
  return undefined;
};

export const validateNoteContent = (content: string): string | undefined => {
  if (!content.trim()) {
    return i18n.t('validation.contentRequired');
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    return i18n.t('validation.contentMaxLength', { max: MAX_CONTENT_LENGTH });
  }
  return undefined;
};

export const validateNoteForm = (title: string, content: string): NoteValidationErrors => {
  return {
    title: validateNoteTitle(title),
    content: validateNoteContent(content),
  };
};

export const isNoteFormValid = (title: string, content: string): boolean => {
  return !validateNoteTitle(title) && !validateNoteContent(content);
};

