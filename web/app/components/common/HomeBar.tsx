'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@images/logo2-white.png';
import { usePathname } from 'next/navigation';

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
      <div>
        <Link href="/about" className="font-normal mx-5 hover:opacity-70">
          About
        </Link>
        <Link href="/auth">
          <button className="my-button p-2 px-4 bg-[#32778C] rounded-lg font-normal hover:">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
