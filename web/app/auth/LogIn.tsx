/*
  LogIn: used in auth page
*/

// react
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// google auth
import { auth } from '@/firebase/clientApp';
import { errorMsg } from '@/firebase/authErrors';

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// icons
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

// components
import TextField from '../components/common/TextField';
import SubmitBtn from './SubmitBtn';
import Error from './Error';

export default function LogIn({ toggle }: { toggle: () => void }) {
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();

  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const loginGoogle = async () => {
    await signInWithPopup(auth, googleAuth)
      .then((result) => {
        if (result.user.displayName) {
          router.push('/dev/home');
          return;
        }
      })
      .catch((error) => {
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setAuthError(msg ?? 'User Not Found');
      });
  };

  const loginManually = async () => {
    if (!(email && password)) {
      setAuthError('Please fill in all fields');
      return;
    }
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('/dev/home');
      })
      .catch((error) => {
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setAuthError(msg ?? 'User Not Found');
      });
  };
  return (
    <div className="bg-white shadow rounded-3xl w-full p-8 max-w-lg">
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
        <TextField
          label="Email"
          setValue={setUserName}
          name="email"
          type="text"
        />

        <TextField
          label="Password"
          setValue={setPassword}
          name="new-password"
          autoComplete="new-password"
          type="password"
          eye={true}
        />
      </div>

      {authError.length > 0 ? <Error>{authError}</Error> : ''}

      <SubmitBtn label="Log In" onClick={loginManually} />

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
          aria-label="Continue with github"
          role="button"
          onClick={loginGoogle}
          className="auth-button">
          <FaGithub className="h-8 w-auto" />
        </button>
      </div>
    </div>
  );
}
