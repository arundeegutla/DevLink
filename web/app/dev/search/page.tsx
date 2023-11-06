'use client';
/**
 * Simple search page for posts. Uses tag selection to filter through posts.
 * Similar to stack overflow but only with tag names: https://i.stack.imgur.com/8fYRk.png
 * Recommends popular tags if the search bar is empty
 */

import { auth } from '@/firebase/clientApp';
import Loading from '@components/common/Loading';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SearchView() {
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
    <div className="w-full h-full flex flex-row items-center justify-center">
      <div className="bg-black p-10 rounded-xl m-4 max-w-lg">
        <h1 className="text-2xl">TODO: Search View</h1>
      </div>
    </div>
  );
}
