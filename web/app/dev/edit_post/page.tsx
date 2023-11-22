'use client';
/**
 * Page that will show up when user creates new post or edit an existing post.
 * When editing, the editor will be pre-populated with the existing post's markdown.
 */

import { auth } from '@/firebase/clientApp';
import Loading from '@components/common/Loading';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function EditPostView() {
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
        <h1 className="text-2xl">TODO: Edit Project View</h1>
      </div>
    </div>
  );
}
