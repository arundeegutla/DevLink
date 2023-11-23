'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@images/logo2-white.png';
import { usePathname } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { BsArrowUpRight } from 'react-icons/bs';
import { auth } from '@/firebase/clientApp';
import { BiLogOut } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

export default function HomeBar({ className }: { className?: string }) {
  const current = usePathname();
  const router = useRouter();
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
    <div
      className={twMerge(
        `absolute z-40 flex flex-row justify-between items-center left-0 right-0 mx-auto w-[80%] max-w-screen-2xl rounded-lg p-4 max-h-max`,
        className
      )}>
      <Link href="/">
        <Image
          width={0}
          height={0}
          src={logo}
          alt="Logo"
          className="h-7 w-auto logo"
        />
      </Link>
      {current == '/' && (
        <div className="flex flex-row items-center">
          <Link href="/auth" className="font-normal mx-5 hover:opacity-70">
            Log In
          </Link>
          <Link href={{ pathname: '/auth', query: { signup: true } }}>
            <button className="my-button flex flex-row items-center p-2 px-4 border-2 border-gray-500 rounded-lg transition-[2s] font-normal hover:bg-white hover:text-black ">
              Get Started
              <BsArrowUpRight className="ml-2" />
            </button>
          </Link>
        </div>
      )}
      {current.includes('/create-profile') && (
        <div className="flex flex-row items-center">
          <button
            onClick={signOut}
            className="my-button flex flex-row items-center p-2 px-4 border-2 border-gray-500 rounded-lg transition-[2s] font-normal hover:bg-white hover:text-black ">
            <BiLogOut className="text-[1.5rem] mr-2" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
