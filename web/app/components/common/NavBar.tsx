'use client';

// React
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Icons
import logo from '@images/icon-link-white.png';
import { GoHomeFill } from 'react-icons/go';
import { BiSearch } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { LuMessageSquare } from 'react-icons/lu';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import { PiTerminalWindowFill } from 'react-icons/pi';
import { MdExplore } from 'react-icons/md';
import { IoEarthOutline } from 'react-icons/io5';

// Auth
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

const navigation = [
  { name: 'Dashboard', href: '/dev/home', icon: MdSpaceDashboard },
  // { name: 'Projects', href: '/dev/projects', icon: PiTerminalWindowFill },
  { name: 'Messages', href: '/dev/inbox', icon: BiSolidMessageSquareDetail },
  { name: 'Explore', href: '/dev/search', icon: MdExplore },
  { name: 'Profile', href: '/dev/account', isProfile: true },
];

export default function NavBar() {
  const currentPath = usePathname();
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

  const getProfilePic = () => {
    if (!user) {
      return (
        <FaUser className="h-auto w-11 mr-2 border-2 border-[#747474] rounded-xl" />
      );
    }
    return (
      <img
        src={
          user.photoURL ??
          'https://s3-symbol-logo.tradingview.com/alphabet--600.png'
        }
        className="h-auto w-8 border-2 border-[#4e4e4e] rounded-xl"
        alt="test"
      />
    );
  };

  {
    /* dev navbar */
  }
  return (
    <div className="z-10 h-full p-4">
      <div className="relative flex flex-col items-center justify-between rounded-3xl p-1 h-full border-2 bg-[#000000] border-[#747474]">
        <div className="flex flex-col items-center justify-between">
          {/* logo */}
          <div className="mt-5">
            <Link href="/">
              <Image src={logo} alt="Logo" className="h-7 w-auto logo" />
            </Link>
          </div>
          {/* navlinks */}
          <div className="flex flex-col items-start mt-14 w-full p-2">
            {navigation.map((item) => (
              <Link href={item.href} className="w-full">
                <div
                  className={`navlink ${
                    currentPath.includes(item.href)
                      ? 'active text-[#dedede]'
                      : 'text-[#adadad]'
                  } `}>
                  <div className="w-8 h-8 flex flex-row items-center justify-center mr-2">
                    {item.isProfile ? (
                      getProfilePic()
                    ) : (
                      <item.icon className="text-[1.5rem]" />
                    )}
                  </div>
                  {item.name}
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom */}
          <div className="absolute bottom-0 flex flex-col items-center mb-2 w-full p-2">
            <hr className="my-1 border-t w-full border-[#3b3b3b]" />
            <div
              className={`navlink ${
                currentPath.includes('settings')
                  ? 'active text-[#dedede]'
                  : 'text-[#adadad]'
              } `}>
              <div className="w-8 h-8 flex flex-row items-center justify-center mr-2">
                <IoEarthOutline className="text-[1.5rem]" />
              </div>
              Feedback
            </div>
            <div
              className={`navlink ${
                currentPath.includes('settings')
                  ? 'active text-[#dedede]'
                  : 'text-[#adadad]'
              } `}>
              <div className="w-8 h-8 flex flex-row items-center justify-center mr-2">
                <IoSettingsSharp className="text-[1.5rem]" />
              </div>
              Settings
            </div>
            <div onClick={signOut} className="navlink text-[#adadad]">
              <div className="w-8 h-8 flex flex-row items-center justify-center mr-2 ">
                <BiLogOut className="text-[1.5rem]" />
              </div>
              Log Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
