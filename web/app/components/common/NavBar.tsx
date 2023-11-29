'use client';

// React
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Icons
import logo from '@images/icon-link-white.png';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
// Auth
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useFBUser } from '@context/FBUserContext';
import { Icons } from '@/models/icons';
import { defaultImageURL, getPhotoURL } from '@/hooks/users';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dev/home', icon: Icons.DashBoard },
  { name: 'Messages', href: '/dev/inbox', icon: Icons.Message },
  { name: 'Explore', href: '/dev/explore', icon: Icons.Explore },
  { name: 'Profile', href: '/dev/account', isProfile: true },
];

export default function NavBar() {
  const { fbuser } = useFBUser();
  const currentPath = usePathname();
  const router = useRouter();
  const [photoUrl, setPhotoUrl] = useState<string>(defaultImageURL);

  useEffect(() => {
    getPhotoURL(fbuser.uid).then((url) => {
      setPhotoUrl(url);
    });
  }, [fbuser]);

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
    <div className="z-10 h-full p-4 items-stretch flex flex-col">
      <div className="relative flex flex-col items-center justify-between rounded-3xl p-1 border-2 bg-[#0000007a] border-[#747474] min-h-max flex-1">
        <div className="flex flex-col items-stretch justify-between h-full">
          {/* logo */}
          <div className="mt-5 mx-auto">
            <Link href="/dev/home">
              <Image
                width={0}
                height={0}
                src={logo}
                alt="Logo"
                className="h-7 w-auto logo"
              />
            </Link>
          </div>
          {/* navlinks */}
          <div className="flex flex-col items-start mt-14 w-full p-2 flex-1 self-stretch mx-auto">
            {navigation.map((item, indx) => (
              <Link href={item.href} key={indx} className="w-full">
                <div
                  className={`navlink ${
                    currentPath.includes(item.href)
                      ? 'active text-[#dedede]'
                      : 'text-[#adadad]'
                  } `}>
                  <div className="w-8 h-8 flex flex-row items-center justify-center mr-2">
                    {item.isProfile ? (
                      <Image
                        width={0}
                        height={0}
                        loading="eager"
                        src={photoUrl}
                        className="aspect-square w-8 border-2 border-[#4e4e4e] rounded-xl"
                        alt="test"
                      />
                    ) : (
                      <item.icon className="text-[1.5rem]" />
                    )}
                  </div>
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
          {/* bottom */}
          <div className="flex flex-col items-center mb-2 w-full p-2 flex-1 justify-end mx-auto">
            <hr className="my-1 border-t w-full border-[#3b3b3b]" />
            {/* <div
              className={`navlink ${
                currentPath.includes('feedback')
                  ? 'active text-[#dedede]'
                  : 'text-[#adadad]'
              } `}>
              <div className="w-8 h-8 flex flex-row items-center justify-center mr-2">
                <Icons.Earth className="text-[1.5rem]" />
              </div>
              Feedback
            </div> */}

            <Link href={'/dev/settings'} className="w-full">
              <div
                className={`navlink ${
                  currentPath.includes('settings')
                    ? 'active text-[#dedede]'
                    : 'text-[#adadad]'
                } `}>
                <div className="w-8 h-8 flex flex-row items-center justify-center mr-2">
                  <Icons.Settings className="text-[1.5rem]" />
                </div>
                Settings
              </div>
            </Link>

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
