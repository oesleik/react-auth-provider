/*
Based on https://github.com/tgmarinho/authrn/blob/master/src/contexts/auth.tsx
*/

import React, { useState, useEffect, useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const AuthContext = React.createContext({
  signed: false,
  user: null,
  loading: true,
  signOut: () => {}
});

function getAuthConfig() {
  return uiConfig;
}

function setAuthConfig(config) {
  Object.assign(uiConfig, config);
}

function AuthForm({ config = {} }) {
  const finalConfig = Object.assign({}, uiConfig, config);
  return <StyledFirebaseAuth uiConfig={finalConfig} firebaseAuth={firebase.auth()} />;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function() {
    return firebase.auth().onAuthStateChanged(function(user) {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const context = {
    signed: !!user,
    user,
    loading,
    signOut
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}

function signOut() {
  firebase.auth().signOut();
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export {
  getAuthConfig,
  setAuthConfig,
  AuthForm,
  AuthProvider,
  useAuth
};
