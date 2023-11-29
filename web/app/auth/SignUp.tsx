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
} from 'firebase/auth';
import { errorMsg } from '@/firebase/authErrors';

// icons
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaRegCircleXmark } from 'react-icons/fa6';

// components
import TextField from '@components/common/TextField';
import SubmitBtn from '@components/common/SubmitBtn';
import Alert from '@components/common/Alert';

export default function SignUp({
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
  const [capLetterReq, setCapLetterReq] = useState(false);
  const [numberReq, setNumberReq] = useState(false);
  const [specialReq, setSpecialReq] = useState(false);
  const [sixLettersReq, setSixLettersReq] = useState(false);

  const updateEmail = (val: string) => {
    setEmail(val);
    setEmailError('');
  };

  const updatePassword = (val: string) => {
    setPassword(val);
    setPasswordError('');
    setCapLetterReq(false);
    setNumberReq(false);
    setSpecialReq(false);
    setSixLettersReq(val.length >= 6);
    for (const c of val) {
      if (c >= 'A' && c <= 'Z') setCapLetterReq(true);
      if (c >= '0' && c <= '9') setNumberReq(true);
      if (c == '!' || c == '@' || c == '#' || c == '$') setSpecialReq(true);
    }
  };

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

  const validate = () => {
    var allgood = true;
    if (!email) {
      setEmailError('Required');
      allgood = false;
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setEmailError('Enter valid email');
      allgood = false;
    }
    if (!password) {
      setPasswordError('Required');
      allgood = false;
    } else if (!(sixLettersReq && numberReq && capLetterReq && specialReq)) {
      setAuthError('Follow password requirements');
      allgood = false;
    }
    return allgood;
  };

  const signUpManually = async () => {
    if (!validate()) return;
    await createUserWithEmailAndPassword(auth, email, password).catch(
      (error) => {
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setAuthError(msg ?? 'There was an error cannot sign up');
      }
    );
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
          onClick={() => {
            setAuthError('');
            changeScreen(0);
          }}>
          {' '}
          Log in
        </span>
      </p>

      {authError && (
        <Alert alertType="danger" className="mx-auto">
          {authError}
        </Alert>
      )}

      <div>
        <TextField
          label="Email"
          setValue={updateEmail}
          name="email"
          type="text"
          autoComplete="username"
          errorMsg={emailError}
          className="mt-3"
        />
        <div className="bg-gray-800 rounded-xl p-0 mt-3">
          <TextField
            label="Password"
            setValue={updatePassword}
            type="password"
            autoComplete="new-password"
            name="new-password"
            eye={true}
            errorMsg={passwordError}
          />
          <div className="flex flex-row items-center justify-around text-sm px-3 py-2 space-x-1">
            <div
              className={`flex flex-row items-center rounded-xl blur-20 ${
                sixLettersReq ? 'bg-green-700' : 'bg-gray-700'
              } p-1`}>
              {sixLettersReq ? (
                <BsFillCheckCircleFill className="mr-2 text-lg" />
              ) : (
                <FaRegCircleXmark className="mr-2 text-lg" />
              )}
              6+ characters
            </div>
            <div
              className={`flex flex-row items-center rounded-xl blur-20 ${
                capLetterReq ? 'bg-green-700' : 'bg-gray-700'
              } p-1`}>
              {capLetterReq ? (
                <BsFillCheckCircleFill className="mr-2 text-lg" />
              ) : (
                <FaRegCircleXmark className="mr-2 text-lg" />
              )}
              Uppercase
            </div>
            <div
              className={`flex flex-row items-center rounded-xl blur-20 ${
                numberReq ? 'bg-green-700' : 'bg-gray-700'
              } p-1`}>
              {numberReq ? (
                <BsFillCheckCircleFill className="mr-2 text-lg" />
              ) : (
                <FaRegCircleXmark className="mr-2 text-lg" />
              )}
              Number
            </div>
            <div
              className={`flex flex-row items-center rounded-xl blur-20 ${
                specialReq ? 'bg-green-700' : 'bg-gray-700'
              } p-1`}>
              {specialReq ? (
                <BsFillCheckCircleFill className="mr-2 text-lg" />
              ) : (
                <FaRegCircleXmark className="mr-2 text-lg" />
              )}
              !@#$
            </div>
          </div>
        </div>
      </div>

      <SubmitBtn label="Sign Up" onClick={signUpManually} className="mt-3" />

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
          className="transition-all duration-500 ease-in-out hover:bg-zinc-800 text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full">
          <FcGoogle className="h-8 w-auto" />
          <p className="text-sm font-medium leading-4 px-2.5 ">
            Continue with Google
          </p>
        </button>
      </div>
    </div>
  );
}
