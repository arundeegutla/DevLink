import * as React from 'react';
import { createContext, useContext, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../src/firebase/clientApp';
import Loading from '../../components/common/Loading';
import { User } from 'firebase/auth';
//import { useRouter } from 'next/navigation';
import { useRouter } from 'expo-router';

interface FBUserContextProps {
  fbuser: User;
}

const FBUserContext = createContext<FBUserContextProps | undefined>(undefined);

export const FBUserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [fbuser, authLoading, error] = useAuthState(auth);
  console.log('FBUserProvider');

  if (authLoading) {
    return <Loading />;
  } else if (error || !fbuser) {
    router.push('/');
    return <Loading />;
  }

  console.log(fbuser);
  console.log('Logged in as: fbuser ' + fbuser.displayName);

  return (
    <FBUserContext.Provider value={{ fbuser }}>
      {children}
    </FBUserContext.Provider>
  );
};

export const useFBUser = () => {
  const context = useContext(FBUserContext);
  if (!context) {
    throw new Error(
      'useFBUser must be used within a FBUserProvider - ask arun'
    );
  }
  return context;
};
