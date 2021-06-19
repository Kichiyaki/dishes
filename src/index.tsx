import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import { APIProvider } from './libs/api';
import createTheme from './libs/material-ui/createTheme';
import { API_URL } from './config/api';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ThemeProvider theme={createTheme()}>
    <APIProvider apiURL={API_URL}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        preventDuplicate
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <App />
      </SnackbarProvider>
    </APIProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
