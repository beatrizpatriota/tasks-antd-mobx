import { createContext, useState, useContext } from 'react';
import PageLayout from '../layout/PageLayout';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  function signIn() {
    setLoggedIn(true);
  }

  function signOut() {
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      <PageLayout isVisible={loggedIn}>
        {children}
      </PageLayout>
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth }