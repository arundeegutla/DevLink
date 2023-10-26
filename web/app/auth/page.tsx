'use client'; // This is a client component 👈🏽

/**
 * Signup page for new users. Takes user through the entire account creation process.
 */

// images
import Image from 'next/image';
import { auth } from '@/firebase/clientApp';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../components/common/Loading';
import { ChangeEvent, useState } from 'react';
import RootLayout from '../layout';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

interface MyFunctions {
  toggle: () => void;
}

export default function AuthScreen() {
  const [currentAuth, setAuthScreen] = useState(true);
  const toggle = () => {
    setAuthScreen(!currentAuth);
  };

  return (
    <main className="back-ground w-screen h-screen overflow-hidden">
      <div className="flex flex-row items-center h-screen mx-auto justify-evenly animated animatedFadeInUp fadeInUp w-[80%] max-w-screen-2xl">
        <div className="tag-line w-[50%]">
          <div>Unlock the</div> Developer Network.
        </div>
        <div className="flex flex-col items-center w-[50%]">
          {currentAuth ? <LogIn toggle={toggle} /> : <SignUp toggle={toggle} />}
        </div>
      </div>
    </main>
  );
}

const LogIn = ({ toggle }: MyFunctions) => {
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();
  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [eyeToggle, setEyeToggle] = useState(false);

  const getUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const getPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleEye = () => {
    setEyeToggle(!eyeToggle);
  };

  const loginGoogle = async () => {
    await signInWithPopup(auth, googleAuth)
      .then((result) => {
        if (result.user.displayName) {
          router.push('/dev/home');
          return;
        }
      })
      .catch((error) => {
        router.push('/auth');
      });
  };
  const loginManually = async () => {
    if (!email || !password) return;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('/dev/home');
      })
      .catch((error) => {
        return;
      });
  };
  return (
    <div className="bg-white shadow rounded-3xl w-full p-10 max-w-lg">
      <p
        tabIndex={0}
        aria-label="Login to your account"
        className="text-2xl font-extrabold leading-6 text-gray-800">
        Login to your account
      </p>
      <p className="text-sm mt-4 font-medium leading-none text-gray-500">
        Dont have account?{' '}
        <span
          tabIndex={0}
          role="link"
          aria-label="Sign up here"
          className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
          onClick={toggle}>
          {' '}
          Sign up here
        </span>
      </p>
      <div className="flex flex-col justify-between mt-3">
        <div className="input-group">
          <input
            onChange={getUserName}
            value={email}
            type="text"
            name="email"
            required
          />
          <label>Email</label>
          <span className="tooltiptext left">Required</span>
        </div>
        <div className="input-group">
          <input
            onChange={getPassword}
            type={!eyeToggle ? 'password' : 'text'}
            name="current-password"
            autoComplete="current-password"
            required
          />
          <label>Password</label>
          <span className="tooltiptext left">Required</span>
          <div
            onClick={toggleEye}
            className="absolute right-3 top-[40%] cursor-pointer">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                fill="#71717A"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={loginManually}
          role="button"
          aria-label="Log In"
          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
          Log In
        </button>
      </div>

      <div className="w-full flex items-center justify-between py-5">
        <hr className="w-full bg-gray-400" />
        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
          OR
        </p>
        <hr className="w-full bg-gray-400  " />
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <button
          aria-label="Continue with google"
          role="button"
          onClick={loginGoogle}
          className="auth-button">
          <FcGoogle className="h-8 w-auto" />
        </button>
        <button
          aria-label="Continue with google"
          role="button"
          onClick={loginGoogle}
          className="auth-button">
          <FaGithub className="h-8 w-auto" />
        </button>
      </div>
    </div>
  );
};

const SignUp = ({ toggle }: MyFunctions) => {
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();
  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [eyeToggle, setEyeToggle] = useState(false);

  const getUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const getPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const getFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFName(e.target.value);
  };
  const getLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLName(e.target.value);
  };

  const toggleEye = () => {
    setEyeToggle(!eyeToggle);
  };

  const signUpGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      if (result.user.displayName) {
        // console.log((await result.user.getIdTokenResult()).token);
        router.push('/dev/home');
        return;
      }
    } catch (error) {}

    router.push('/auth');
  };

  const signUpManually = async () => {
    if (!email || !password) return;
    const loginAuth = getAuth();
    createUserWithEmailAndPassword(loginAuth, email, password)
      .then(async function (result) {
        await updateProfile(result.user, {
          displayName: fname + lname,
          photoURL: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
        });
        router.push('/dev/home');
      })
      .catch(function (error) {
        console.log(error);
        router.push('/auth');
        return;
      });
  };
  return (
    <div className="bg-white shadow rounded-3xl w-full p-10 max-w-lg">
      <p
        tabIndex={0}
        aria-roledescription="heading"
        aria-label="Login to your account"
        className="text-2xl font-extrabold leading-6 text-gray-800">
        Sign up for an account
      </p>
      <p className="text-sm mt-4 font-medium leading-none text-gray-500">
        Already have account?{' '}
        <span
          tabIndex={0}
          role="link"
          aria-label="Sign up here"
          className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
          onClick={toggle}>
          {' '}
          Log in
        </span>
      </p>

      <div className="mt-3">
        <div className="flex flex-row w-full">
          <div className="input-group">
            <input
              onChange={getFirstName}
              value={fname}
              type="fname"
              name="fname"
              required
            />
            <label>First Name</label>
            <span className="tooltiptext left">Required</span>
          </div>
          <div className="input-group ml-3">
            <input
              onChange={getLastName}
              value={lname}
              type="lname"
              name="lname"
              required
            />
            <label>Last Name</label>
            <span className="tooltiptext left">Required</span>
          </div>
        </div>

        <div className="input-group">
          <input
            onChange={getUserName}
            value={email}
            type="text"
            name="email"
            required
          />
          <label>Email</label>
          <span className="tooltiptext left">Required</span>
        </div>

        <div className="input-group">
          <input
            onChange={getPassword}
            type={!eyeToggle ? 'password' : 'text'}
            name="new-password"
            autoComplete="new-password"
            required
          />
          <label>Password</label>
          <span className="tooltiptext left">Required</span>
          <div
            onClick={toggleEye}
            className="absolute right-3 top-[40%] cursor-pointer">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                fill="#71717A"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={signUpManually}
          role="button"
          aria-label="Sign Up"
          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
          Sign Up
        </button>
      </div>

      <div className="w-full flex items-center justify-between py-5">
        <hr className="w-full bg-gray-400" />
        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
          OR
        </p>
        <hr className="w-full bg-gray-400  " />
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <button
          aria-label="Continue with google"
          role="button"
          onClick={signUpGoogle}
          className="auth-button">
          <FcGoogle className="h-8 w-auto" />
        </button>
        <button
          aria-label="Continue with google"
          role="button"
          onClick={signUpGoogle}
          className="auth-button">
          <FaGithub className="h-8 w-auto" />
        </button>
      </div>
    </div>
  );
};
