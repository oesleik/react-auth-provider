import React from 'react';
import { AuthProvider } from './auth';
import AppRouter from './AppRouter';

export default function App() {
  return (
    <AuthProvider>
     <AppRouter />
    </AuthProvider>
  );
}
