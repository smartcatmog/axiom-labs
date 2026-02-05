import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <button 
      onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 9999,
        padding: '10px 20px',
        backgroundColor: '#722ed1',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      {lang === 'en' ? 'ZH' : 'EN'}
    </button>
  );
};