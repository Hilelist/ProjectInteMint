// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <App />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  </StrictMode>
);
