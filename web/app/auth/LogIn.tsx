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
import Error from './Alert';

export default function LogIn({
  changeScreen,
}: {
  changeScreen: (screen: number) => void;
}) {
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState('');

  const updateEmail = (val: string) => {
    setEmail(val);
    setEmailError('');
    setAuthError('');
  };

  const updatePassword = (val: string) => {
    setPassword(val);
    setPasswordError('');
    setAuthError('');
  };

  const loginGoogle = async () => {
    await signInWithPopup(auth, googleAuth)
      .then((result) => {
        // signed in.
      })
      .catch((error) => {
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setAuthError(msg ?? 'User Not Found');
      });
  };

  const validate = () => {
    var allgood = true;
    if (!email) {
      setEmailError('Required');
      allgood = false;
    }
    if (!email) {
      setEmailError('Required');
      allgood = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Enter valid email');
      allgood = false;
    }
    if (!password) {
      setPasswordError('Required');
      allgood = false;
    }
    return allgood;
  };
  const loginManually = async () => {
    if (!validate()) return;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // signed in.
      })
      .catch((error) => {
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setAuthError(msg ?? 'Incorrect Username or Password');
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
          onClick={() => {
            setAuthError('');
            changeScreen(1);
          }}>
          {' '}
          Sign up here
        </span>
      </p>
      <div className="flex flex-col justify-between mt-3">
        {authError.length > 0 ? <Error>{authError}</Error> : ''}

        <TextField
          label="Email"
          setValue={updateEmail}
          name="email"
          type="text"
          autoComplete="username"
          errorMsg={emailError}
          className="mt-3"
        />

        <TextField
          label="Password"
          setValue={updatePassword}
          name="current-password"
          autoComplete="current-password"
          type="password"
          eye={true}
          errorMsg={passwordError}
          className="mt-3"
        />
      </div>
      <div
        tabIndex={0}
        role="link"
        aria-label="Sign up here"
        className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer mt-3 w-fit"
        onClick={() => {
          setAuthError('');
          changeScreen(2);
        }}>
        {' '}
        Forgot Password?
      </div>

      <SubmitBtn label="Log In" onClick={loginManually} className="mt-3" />

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
