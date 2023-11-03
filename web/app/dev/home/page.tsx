'use client';
/**
 * Page with community feed as focal point. Inbox and project list on the side.
 */

//react
import { useRouter } from 'next/navigation';

// components
import Loading from '@components/common/Loading';

// auth
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import PostCard from '@components/common/PostCard';

export default function Home() {
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
    <div className="m-4 w-full flex flex-row">
      {/* feed */}
      <div className="relative flex flex-col w-[60%] h-[100vh] mx-4">
        <div className="black-blur absolute top-0 left-0 rounded-lg bg-black p-3 w-full">
          <h1 className="text-3xl font-semibold">Community</h1>
        </div>
        <div className="overflow-auto p-10 pt-14">
          {Array.from({ length: 100 }, (_, index) => (
            <PostCard
              key={index}
              user={`User ${index + 1}`}
              setLike={() => {}}
              description={`Description ${index + 1}`}
              time={`${index + 1} hrs ago`}
              userphoto="https://cdn-icons-png.flaticon.com/512/147/147142.png"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-[40%]">
        <h1 className="text-3xl">Projects</h1>
      </div>
    </div>
  );
}
