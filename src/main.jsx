import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppContextProvider } from '@/context/AppContext.jsx';
import { ThemeProvider } from './provider/ThemeProvider.jsx';
import { Toaster } from '@/components/ui/sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <AppContextProvider>
        <App />
        <Toaster />
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
