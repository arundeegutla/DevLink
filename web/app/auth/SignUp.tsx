/*
  SignUp: used in auth page
*/

// react
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

// google auth
import { auth } from '@/firebase/clientApp';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { errorMsg } from '@/firebase/authErrors';

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
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [authError, setAuthError] = useState('');

  const signUpGoogle = async () => {
    await signInWithPopup(auth, googleAuth)
      .then((result) => {
        router.push('/dev/home');
      })
      .catch((error) => {
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setAuthError(msg ?? 'There was an error cannot sign up');
      });
  };

  const signUpManually = async () => {
    if (!(fname && lname && email && password)) {
      setAuthError('Please fill in all fields');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async function (result) {
        await updateProfile(result.user, {
          displayName: fname + lname,
          photoURL: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
        }).then((e) => {
          router.push('/dev/home');
          console.log('updated profile');
        });
        await sendEmailVerification(result.user)
          .then((e) => {})
          .catch((e) => {});
      })
      .catch(function (error) {
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setAuthError(msg ?? 'There was an error cannot sign up');
      });
  };

  return (
    <div className="bg-white shadow rounded-3xl w-full p-8 max-w-lg">
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
          <TextField
            label="First Name"
            setValue={setFName}
            name="fname"
            type="fname"
          />

          <TextField
            label="Last Name"
            setValue={setLName}
            name="lname"
            type="lname"
            className="ml-3"
          />
        </div>

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

      <SubmitBtn label="Sign Up" onClick={signUpManually} />

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
}
