# Auth with Firebase

Auth provider on top of [firebaseui-web-react](https://github.com/firebase/firebaseui-web-react).

## Installation and Usage

With npm:

```bash
npm install --save git+https://github.com/oesleik/react-auth-provider.git
npm install --save firebase
```

With yarn:

```bash
yarn add git+https://github.com/oesleik/react-auth-provider.git
yarn add firebase
```

In your app:

1. Configure Firebase as described in [the Firebase Docs](https://firebase.google.com/docs/web/setup).
2. Configure the available providers with `setAuthConfig`.
3. Use the `AuthProvider` component in your template.
4. Use the `useAuth` hook to get the signed user.
5. Use the `AuthForm` component if the user is not signed-in.

```js
import React from 'react';
import firebase from 'firebase';

import {
  setAuthConfig,
  AuthProvider,
  useAuth,
  AuthForm
} from 'react-auth-provider';

firebase.initializeApp({
  // https://support.google.com/firebase/answer/7015592#web
});

// https://github.com/firebase/firebaseui-web#configuration
setAuthConfig({
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ]
});

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

function AppRouter() {
  const { loading, signed, user, signOut } = useAuth();

  if (loading) {
    return <div>Loading</div>;
  }

  if (!signed) {
    return <AuthForm />
  }

  return (
    <div>
      <p>Welcome {user.displayName}! You are now signed-in!</p>
      <button type="button" onClick={signOut}>Sign-out</button>
    </div>
  );
}

export default App;
```

## Running the demo

1. Clone the `.env` file as `.env.local` and set your firebase app.
2. Install the dependencies with `yarn`.
3. Start the server with `yarn start`.
