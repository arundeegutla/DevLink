import * as React from 'react';
import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../src/firebase/clientApp';
import { getUser, useGetUser } from '../../src/hooks/users';
import Loading from '../../components/common/Loading';
import { User } from 'firebase/auth';
import { usePathname, useRouter } from 'expo-router';
import * as models from '../../src/hooks/models';
import {
  QueryClient,
  QueryClientProvider,
  QueryObserverResult,
  RefetchOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useFBUser } from './FBUserContext';

interface DLUserContextProps {
  user: models.User | null | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<models.User | null, Error>>;
}

const DLUserContext = createContext<DLUserContextProps | undefined>(undefined);

export const useDLUser = () => {
  const context = useContext(DLUserContext);
  if (!context) {
    throw new Error('useDLUser must be used within a DLUserProvider');
  }
  return context;
};

export const DLUserProvider = ({ children }: { children: ReactNode }) => {
  const { fbuser } = useFBUser();
  const path = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {
    data: user,
    isFetching,
    isLoading,
    isPending,
    refetch,
  } = useGetUser(fbuser, fbuser.uid);

  useEffect(() => {
    setLoading(isLoading || isPending || isFetching);
  }, [isLoading, isPending, isFetching]);

  useEffect(() => {
    if (!user && !loading) { // Add a condition to prevent infinite loop
      router.push('/dev/home');
    }
  }, [user, loading, router]); // Add dependencies to prevent unnecessary runs

  if (loading) {
    return <Loading />;
  }

  return (
    <DLUserContext.Provider value={{user, refetch }}>
      {children}
    </DLUserContext.Provider>
  );
};