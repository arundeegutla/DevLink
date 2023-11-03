'use client';
// React
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
import { BsPeopleFill } from 'react-icons/bs';

const navigation = [
  { name: 'Home', href: '/dev/home', icon: GoHomeFill },
  { name: 'Search', href: '/dev/search' },
  { name: 'Inbox', href: '/dev/inbox' },
];

export default function NavBar() {
  const current = usePathname();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        router.push('/');
        console.log('going home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFirstWord = (str: string) => {
    const words = str.split(' ');
    if (words.length > 0) {
      return words[0];
    } else {
      return 'Guest';
    }
  };

  const getStrippedName = () => {
    if (!user) return 'undefined';
    var count = 10;
    const name: string = user?.displayName
      ? getFirstWord(user.displayName)
      : '';
    var result = name.slice(0, count) + (name.length > count ? '...' : '');
    return result;
  };

  const getProfilePic = () => {
    if (!user) {
      return (
        <FaUser className="h-9 w-auto border-2 border-[#747474] rounded-xl" />
      );
    }
    console.log(user.photoURL);
    console.log(user);
    return (
      <img
        src={
          user.photoURL ??
          'https://s3-symbol-logo.tradingview.com/alphabet--600.png'
        }
        className="h-9 w-auto border-2 border-[#747474] rounded-xl"
        alt="test"
      />
    );
  };

  {
    /* dev navbar */
  }
  return (
    <div className="z-10 h-full p-4">
      <div className="flex flex-col items-center justify-between rounded-3xl p-1 h-full border-2 border-[#747474]">
        <div className="flex flex-col items-center justify-between">
          {/* logo */}
          <div className="mt-5">
            <Link href="/">
              <Image src={logo} alt="Logo" className="h-7 w-auto logo" />
            </Link>
          </div>
          {/* navlinks */}
          <div className="flex flex-col items-center mt-20 w-full">
            <Link href="/dev/home">
              <button className="flex flex-row items-center my-button p-2 px-4 bg-[#404040] rounded-xl font-normal text-sm">
                <GoHomeFill className="text-[25px] mr-2" />
                Home
              </button>
            </Link>
            <Link href="/dev/home">
              <button className="flex flex-row items-center my-button p-2 px-4 bg-[#40404000] rounded-lg font-normal mt-2 text-sm">
                <FaSearch className="text-[20px] mr-2" />
                Search
              </button>
            </Link>
            <Link href="/dev/home">
              <button className="flex flex-row items-center my-button p-2 px-4 bg-[#40404000] rounded-lg font-normal mt-2 text-sm">
                <BsPeopleFill className="text-[20px] mr-2" />
                People
              </button>
            </Link>
          </div>
        </div>
        <div
          onClick={signOut}
          className="flex flex-row items-center w-36 rounded-2xl p-1 border-2 border-[#747474] hover:bg-slate-800 hover:cursor-pointer">
          <div className="mr-1">{getProfilePic()}</div>
          <div className="text-lg">{getStrippedName()}</div>
        </div>
      </div>
    </div>
  );
}
