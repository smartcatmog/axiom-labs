import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <button 
      onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
      style={{
        position: 'fixed',
        top: '80px',     // 往下挪一点，防止被浏览器顶栏挡住
        right: '20px',
        zIndex: 9999,    // 确保它在最前面
        padding: '10px 20px',
        backgroundColor: '#722ed1', // 紫色，在你的黑色网页里会很显眼
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
        fontWeight: 'bold'
      }}
    >
      {lang === 'en' ? '切换至中文' : 'Switch to English'}
    </button>
  );
};