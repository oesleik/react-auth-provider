import React from 'react';
import { useAuth } from './auth';

export default function UserHome() {
  const { user, signOut } = useAuth();

  return (
    <div>
      <p>Welcome {user.displayName}! You are now signed-in!</p>
      <button type="button" onClick={signOut}>Sign-out</button>
    </div>
  );
}
