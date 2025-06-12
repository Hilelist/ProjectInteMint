import { useUser } from '@clerk/clerk-react';

export const useAuth = () => {
  const { user } = useUser();
  return { user };
}; 