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
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    router.push('/');
    return <Loading />;
  }

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div className="relative flex flex-row h-screen bg-[#151515] overflow-hidden">
      <NavBar />
      <div className="flex-grow h-[100vh] overflow-scroll">{children}</div>
      <div className="absolute -top-6 -left-6 w-60 h-60 opacity-30 filter blur-[70px] rounded-full bg-[#4b45fc]"></div>
    </div>
  );
}
