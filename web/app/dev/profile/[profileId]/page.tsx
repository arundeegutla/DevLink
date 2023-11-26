'use client';
/**
 * Shows someone else's profile. Contact information and the other person's
 * current projects will be hidden.
 */

// External Components
import Loading from '@components/common/Loading';
import UserProfile from '@components/common/UserProfile';

// Auth
import { auth } from '@/firebase/clientApp';
import { useUser } from '@context/UserContext';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Profile() {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

  if (user && !user.emailVerified) {
    router.push('/dev/verify');
    return <Loading />;
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    router.push('/');
    console.log('no user signed in home');
    return <Loading />;
  }
  
  // WE WILL USE THIS SOON ON THIS PAGE, NEED TO REPLACE INSTANCES OF user WITH fbuser
  // const { fbuser } = useUser();

  return (
    <UserProfile isSelfProfile={false} user={user} />
  );
}
