import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { getUser } from '@/hooks/users';
import Loading from '@components/common/Loading';
import { User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import * as models from '@/hooks/models';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface UserContextProps {
  fbuser: User;
  user?: models.User;
  refetchUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const router = useRouter();
  const [fbuser, authLoading, error] = useAuthState(auth);
  const [user, setUser] = useState<models.User>();
  const [queryClient] = React.useState(() => new QueryClient())
  const [loading, setLoading] = useState(true);

  const refetchUser = useCallback(async () => {
    setLoading(true);

    if (fbuser) {
      let u = await getUser(fbuser, fbuser.uid);
      setUser(u ? u : undefined);
      setLoading(false);
    }
  }, [fbuser]);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  if (authLoading || loading) {
    return <Loading />;
  } else if (error || !fbuser) {
    router.push('/');
    return <Loading />;
  } else if (!user && !path.includes('/create-profile')) {
    router.push('/create-profile');
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ fbuser, user, refetchUser }}>
        {children}
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider - ask arun');
  }
  return context;
};
