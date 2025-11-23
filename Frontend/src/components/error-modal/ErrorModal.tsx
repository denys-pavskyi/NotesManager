import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useError } from "../../contexts/ErrorContext";
import "./ErrorModal.scss";

export function ErrorModal() {
  const { t } = useTranslation();
  const { error, clearError } = useError();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 7000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div className={`error-toast ${isExpanded ? "expanded" : ""}`}>
      <div className="error-toast-content">
        <span className="error-toast-icon">⚠</span>
        <div className="error-toast-message">
          <p className="error-toast-title">{error.message}</p>
          {error.hasValidationErrors() && (
            <p className="error-toast-details">
              {error.getValidationErrors().slice(0, 2).join(", ")}
              {error.getValidationErrors().length > 2 && "..."}
            </p>
          )}
          <p className="error-toast-code">{t('common.status')}: {error.statusCode}</p>
        </div>
      </div>

      {isExpanded && (
        <div className="error-toast-details-panel">
          {error.hasValidationErrors() && (
            <div className="error-detail-section">
              <strong>{t('common.validationErrors')}:</strong>
              <ul>
                {error.getValidationErrors().map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          {error.timestamp && (
            <div className="error-detail-section">
              <small>{new Date(error.timestamp).toLocaleString()}</small>
            </div>
          )}
        </div>
      )}

      <div className="error-toast-actions">
        {error.hasValidationErrors() && (
          <button
            className="error-toast-expand"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? t('common.collapse') : t('common.showDetails')}
          >
            {isExpanded ? "▲" : "▼"}
          </button>
        )}
        <button className="error-toast-close" onClick={clearError}>
          ✕
        </button>
      </div>
    </div>
  );
}
