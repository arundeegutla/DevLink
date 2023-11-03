'use client';
/**
 * Email Verification page
 */

//react
import { useRouter } from 'next/navigation';

// components
import Loading from '@components/common/Loading';

// auth
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

export default function Home() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  if (user && user.emailVerified) {
    router.push('/dev/home');
    return <Loading />;
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    router.push('/');
    console.log('no user signed in');
    return <Loading />;
  }

  return <div>Please verify ur email</div>;
}
