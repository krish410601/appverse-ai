import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { AppRouter } from './routes';
import { Toast } from './components/common/Toast';

export const App = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <AppRouter />
          <Toast />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
