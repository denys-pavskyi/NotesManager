import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import homeIcon from '../../assets/home.png';
import { LanguageSwitcher } from '../language-switcher/LanguageSwitcher';
import './Navbar.scss';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-home-link">
          <img src={homeIcon} alt={t('common.home')} className="home-icon" />
          {t('common.home')}
        </Link>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
