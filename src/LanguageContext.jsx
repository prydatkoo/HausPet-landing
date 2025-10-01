import React, { createContext, useState } from 'react';
import { translations } from './translations'

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get saved language from localStorage, default to 'EN'
    const savedLanguage = localStorage.getItem('hauspet-language')
    return savedLanguage || 'EN'
  })
  
  // Enhanced setLanguage function with localStorage persistence
  const setLanguageWithPersistence = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem('hauspet-language', newLanguage)
  }
  
  const t = (key) => {
    return key.split('.').reduce((acc, cur) => {
      if (acc && typeof acc === 'object' && cur in acc) {
        return acc[cur];
      }
      return undefined;
    }, translations[language]) || key;
  }
  
  const value = {
    language,
    setLanguage: setLanguageWithPersistence,
    t
  }
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
} 