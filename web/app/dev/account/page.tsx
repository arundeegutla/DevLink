'use client';
/**
 * Displays the logged in user's profile. Pfp, contact information, linked platforms,
 * current posts, current projects, and skills.
 */

import { auth } from '@/firebase/clientApp';
import Loading from '@components/common/Loading';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Account() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  if (user && !user.emailVerified) {
    router.push('/create-profile');
    return <Loading />;
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    router.push('/');
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-row items-center justify-center">
      <div className="bg-black p-10 rounded-xl m-4 max-w-lg">
        <h1 className="text-2xl">TODO: User Account View</h1>
      </div>
    </div>
  );
}
