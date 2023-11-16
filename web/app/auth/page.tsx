'use client'; // This is a client component 👈🏽

/**
 * Signup page for new users. Takes user through the entire account creation process.
 */
import { useRouter } from 'next/navigation';

// Components
import HomeBar from '@components/common/HomeBar';
import Loading from '@components/common/Loading';
import { useState, useEffect } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

// auth
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { twMerge } from 'tailwind-merge';

// icons
import { FaNode, FaNodeJs, FaPython, FaReact, FaVuejs } from 'react-icons/fa6';
import { AiFillHtml5 } from 'react-icons/ai';
import { FiCode } from 'react-icons/fi';
import {
  IoLogoAngular,
  IoLogoCss3,
  IoLogoJavascript,
  IoLogoNodejs,
} from 'react-icons/io5';

import { SiTypescript } from 'react-icons/si';

const tags = [
  {
    label: 'Developer',
    className: 'bg-gray-200 text-gray-800',
    icon: FiCode,
  },

  {
    label: 'React',
    className: 'bg-blue-200 text-blue-800',
    icon: FaReact,
  },
  {
    label: 'HTML',
    className: 'bg-red-200 text-red-800',
    icon: AiFillHtml5,
  },
  {
    label: 'CSS',
    className: 'bg-indigo-200 text-indigo-800',
    icon: IoLogoCss3,
  },
  {
    label: 'JavaScript',
    className: 'bg-yellow-200 text-yellow-800',
    icon: IoLogoJavascript,
  },
  {
    label: 'Node.js',
    className: 'bg-green-200 text-green-800',
    icon: IoLogoNodejs,
  },
  {
    label: 'Python',
    className: 'bg-yellow-200 text-yellow-800',
    icon: FaPython,
  },
  {
    label: 'Vue.js',
    className: 'bg-green-200 text-green-800',
    icon: FaVuejs,
  },
  {
    label: 'Angular',
    className: 'bg-red-200 text-red-800',
    icon: IoLogoAngular,
  },
  {
    label: 'TypeScript',
    className: 'bg-blue-200 text-blue-800',
    icon: SiTypescript,
  },
  {
    label: 'Express.js',
    className: 'bg-gray-200 text-gray-800',
    icon: FaNodeJs,
  },
  // Add more technologies as needed
];

export default function AuthScreen() {
  const router = useRouter();
  const [screenType, setScreenType] = useState(0);
  const [curTagInd, setCurTag] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurTag((prevIndex) => (prevIndex + 1) % tags.length);
      console.log('second');
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [curTagInd]);

  const [user, loading, error] = useAuthState(auth);
  if (user && user.displayName) {
    router.push('/dev/home');
    return <Loading />;
  } else if (loading) {
    return <Loading />;
  } else {
    console.log('no user signed in');
  }
  const changeScreen = (num: number) => {
    setScreenType(num);
  };
  const screens = [
    <LogIn changeScreen={changeScreen} />,
    <SignUp changeScreen={changeScreen} />,
    <ForgotPassword changeScreen={changeScreen} />,
  ];

  return (
    <>
      <main className="back-ground w-screen h-screen overflow-hidden">
        <HomeBar />
        <div className="flex flex-row items-center h-screen mx-auto justify-evenly animated animatedFadeInUp fadeInUp w-[80%] max-w-screen-2xl">
          <div className="vertical-layout w-[50%] mx-auto items-center flex flex-col">
            <div>Unlock the</div>
            {tags.map((tag, index) => (
              <span
                key={index}
                className={twMerge(
                  'px-10 rounded-xl transition-all duration-500 ease-in-out flex flex-row items-center space-x-4 whitespace-nowrap mr-7',
                  `${tag.className} ${
                    index === curTagInd
                      ? 'animated animatedFadeInUp fadeInUp'
                      : 'hidden'
                  }`
                )}>
                {<tag.icon className="mr-3" />}
                {tag.label}
              </span>
            ))}
            Network.
          </div>
          <div className="flex flex-col items-center w-[50%]">
            {screens.map((screen, index) => (
              <div
                key={index}
                className={`${
                  screenType === index
                    ? 'animated animatedFadeInUp fadeInUp'
                    : 'hidden'
                }`}>
                {screen}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}