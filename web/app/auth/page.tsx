'use client'; // This is a client component 👈🏽

/**
 * Signup page for new users. Takes user through the entire account creation process.
 */
import { useRouter } from 'next/navigation';

// Components
import HomeBar from '@components/common/HomeBar';
import Loading from '@components/common/Loading';
import { use, useState } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

// auth
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

export default function AuthScreen() {
  const router = useRouter();
  const [screenType, setScreenType] = useState(0);

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
      <HomeBar />
      <main className="back-ground w-screen h-screen overflow-hidden">
        <div className="flex flex-row items-center h-screen mx-auto justify-evenly animated animatedFadeInUp fadeInUp w-[80%] max-w-screen-2xl">
          <div className="tag-line w-[50%]">
            <div>Unlock the</div> Developer Network.
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
