'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Icons
import logo from '@images/icon-link-white.png';
import { GoHomeFill } from 'react-icons/go';
import { FaSearch } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

// Auth
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ReactNode } from 'react';

const navigation = [
  { name: 'Home', href: '/dev/home', icon: GoHomeFill },
  { name: 'Search', href: '/dev/search' },
  { name: 'Inbox', href: '/dev/inbox' },
];

export default function NavBar() {
  const current = usePathname();

  const [user, loading, error] = useAuthState(auth);

  const signOut = () => {
    auth
      .signOut()
      .then(function () {
        // useRouter().push('/auth');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProfilePic = (): ReactNode => {
    if (!user) {
      return <FaUser className="h-8 w-auto rounded-full" />;
    }
    const url: string = user.photoURL !== null ? user.photoURL : '';
    return <Image src={url} className="h-8 w-auto rounded-full" alt="pfp" />;
  };

  {
    /* dev navbar */
  }
  return (
    <div className="absolute z-10 left-0 top-0 h-full py-4 pl-4 ">
      <div className="flex flex-col items-center justify-between rounded-xl p-4 h-full border-2 border-gray-300">
        <div className="flex flex-col items-center justify-between">
          {/* logo */}
          <div>
            <Link href="/">
              <Image src={logo} alt="Logo" className="h-7 w-auto logo" />
            </Link>
          </div>
          {/* navlinks */}
          <div className="flex flex-col mt-4 w-full">
            <Link href="/dev/home">
              <button className="flex flex-row items-center my-button p-2 px-4 bg-[#404040] rounded-lg font-normal">
                <GoHomeFill className="text-[25px] mr-1" />
                Home
              </button>
            </Link>
            <Link href="/dev/home">
              <button className="flex flex-row items-center my-button p-2 px-4 bg-[#40404000] rounded-lg font-normal">
                <FaSearch className="text-[20px] mr-1" />
                Search
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between rounded-lg p-4 border-2 border-gray-300">
          <h2>{user?.displayName}</h2>
        </div>
      </div>
    </div>
  );
}
