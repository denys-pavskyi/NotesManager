import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher">
      <button
        className={`lang-button ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en')}
        title="English"
      >
        EN
      </button>
      <button
        className={`lang-button ${i18n.language === 'ua' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('ua')}
        title="Українська"
      >
        UA
      </button>
    </div>
  );
};

