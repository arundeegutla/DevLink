'use client';

import NavBar from '@components/common/NavBar';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '@components/common/Loading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  if (user) {
    console.log(user.emailVerified);
  } else if (loading) {
    return <Loading />;
  } else {
    router.push('/');
    return <Loading />;
  }
  return (
    <div className="flex flex-row h-screen bg-[#171717] overflow-hidden">
      <NavBar />
      <div className="flex-grow h-full">{children}</div>
    </div>
  );
}
