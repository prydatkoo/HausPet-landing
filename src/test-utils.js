import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageContext } from './LanguageContext';

const AllTheProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <LanguageContext.Provider value={{ language: 'EN', setLanguage: () => {}, t: (key) => key }}>
        {children}
      </LanguageContext.Provider>
    </MemoryRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
