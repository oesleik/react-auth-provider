import React from 'react';
import { useAuth } from './auth';
import UserHome from './UserHome';
import SignIn from './SignIn';

export default function AppRouter() {
  const { signed, loading } = useAuth();

  if (loading) {
    return <div />;
  }

  if (signed) {
    return <UserHome />;
  }

  return <SignIn />
}
