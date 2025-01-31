// src/context/FontContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const FontContext = createContext();

export const useFont = () => {
  return useContext(FontContext);
};

export const FontProvider = ({ children }) => {
  const [font, setFont] = useState(() => {
    return (
      localStorage.getItem('font') ||
      "'Segoe UI', 'San Francisco', 'Roboto', 'Arial', sans-serif"
    );
  });

  useEffect(() => {
    const savedFont = localStorage.getItem('font');
    if (savedFont) {
      setFont(savedFont);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('font', font);
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
};
