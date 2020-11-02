import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from './firebase';
import { setAuthConfig } from './auth';

setAuthConfig({
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
