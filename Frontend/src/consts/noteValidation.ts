export const MAX_TITLE_LENGTH = 40;
export const MAX_CONTENT_LENGTH = 1000;

export interface NoteValidationErrors {
  title?: string;
  content?: string;
}

export const validateNoteTitle = (title: string): string | undefined => {
  if (!title.trim()) {
    return 'Title is required';
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return `Title must be no more than ${MAX_TITLE_LENGTH} characters`;
  }
  return undefined;
};

export const validateNoteContent = (content: string): string | undefined => {
  if (!content.trim()) {
    return 'Content is required';
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    return `Content must be no more than ${MAX_CONTENT_LENGTH} characters`;
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

