// src/components/auth/SignInPage.tsx                          // ← Assure-toi d'importer React
import { SignIn } from '@clerk/clerk-react';            // ← Import du composant SignIn

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn path="/sign-in" routing="path" />         {/* ← Ton composant Clerk */}
    </div>
  );
}
