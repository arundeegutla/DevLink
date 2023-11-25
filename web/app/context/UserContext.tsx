import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { getUserById } from '@/hooks/users';
import Loading from '@components/common/Loading';
import { User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import * as models from '@/hooks/models';

interface UserContextProps {
  fbuser: User;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const router = useRouter();
  const [fbuser, authLoading, error] = useAuthState(auth);
  const [user, setUser] = useState<models.User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (fbuser) {
        setUser(
          await getUserById(fbuser, fbuser.uid).catch(() => {
            return undefined;
          })
        );
      }
    };
    setLoading(true);
    fetchUser().finally(() => setLoading(false));
  }, [fbuser]);

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
    <UserContext.Provider value={{ fbuser }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
