import { createContext, useContext, useState, type ReactNode } from "react";
import type { ApiError } from "../types/apiError";

interface ErrorContextType {
  error: ApiError | null;
  showError: (error: ApiError) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<ApiError | null>(null);

  const showError = (error: ApiError) => {
    setError(error);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within ErrorProvider");
  }
  return context;
}