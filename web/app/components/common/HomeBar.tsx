'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@images/logo2-white.png';
import { usePathname } from 'next/navigation';

// icons
import { BsArrowUpRight } from 'react-icons/bs';

export default function HomeBar() {
  const current = usePathname();

  {
    /* home page navbar */
  }
  return (
    <div className="absolute z-10 flex flex-row justify-between items-center left-0 right-0 mt-2 mx-auto w-[80%] max-w-screen-2xl rounded-lg p-4 max-h-max">
      <Link href="/">
        <Image src={logo} alt="Logo" className="h-7 w-auto logo" />
      </Link>
      <div className="flex flex-row items-center">
        <Link href="/auth" className="font-normal mx-5 hover:opacity-70">
          Log In
        </Link>
        <Link href="/auth">
          <button className="my-button flex flex-row items-center p-2 px-4 border-2 border-gray-500 rounded-lg transition-[2s] font-normal hover:bg-white hover:text-black ">
            Get Started
            <BsArrowUpRight className="ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
}
