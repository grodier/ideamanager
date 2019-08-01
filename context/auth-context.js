import { useEffect, useState, useContext, createContext } from 'react';
import datasource from '../utils/datasource';
import { useRouter } from 'next/router';

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(datasource.getCurrentUser());
  const [isPending, setIsPending] = useState(!user);
  const router = useRouter();

  async function onUserStateChanged(user) {
    setUser(user);
    setIsPending(false);
    if (!user) {
      router.push('/login');
    }
  }

  useEffect(() => {
    const unsubscribe = datasource.handleUserStateChanged(onUserStateChanged);
    return () => unsubscribe();
  }, []);

  if (isPending) {
    return <div>Is Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, signOut: datasource.signOutUser }}
      {...props}
    />
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
