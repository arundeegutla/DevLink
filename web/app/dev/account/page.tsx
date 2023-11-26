'use client';
/**
 * Displays the logged in user's profile. Pfp, contact information, linked platforms,
 * current posts, current projects, and skills.
 */

// External Components
import Loading from '@components/common/Loading';
import UserProfile from '@components/common/UserProfile';

// Auth
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Account() {
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

  return (
    <UserProfile isSelfProfile={true} user={user} />
  );
}
