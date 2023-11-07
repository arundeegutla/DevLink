/*
  LogIn: used in auth page
*/

// react
import { useRouter } from 'next/navigation';
import { useState } from 'react';

//icons
import { IoChevronBackCircleSharp } from 'react-icons/io5';

// google auth
import { auth } from '@/firebase/clientApp';
import { errorMsg } from '@/firebase/authErrors';
import { sendPasswordResetEmail } from 'firebase/auth';

// components
import TextField from '../components/common/TextField';
import SubmitBtn from '../components/common/SubmitBtn';
import Error from '../components/common/Alert';

export default function ForgotPassword({
  changeScreen,
}: {
  changeScreen: (screen: number) => void;
}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [alert, setAlert] = useState('');

  const updateEmail = (val: string) => {
    setEmail(val);
    setEmailError('');
    setAlert('');
  };

  const validate = () => {
    var allgood = true;
    if (!email) {
      setEmailError('Required');
      allgood = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Enter valid email');
      allgood = false;
    }
    return allgood;
  };
  const sendEmail = async () => {
    if (!validate()) return;
    await sendPasswordResetEmail(auth, email)
      .then((e) => {
        //sent
        setAlert('Sent Reset Instructions');
      })
      .catch((error) => {
        // error
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setAlert(msg ?? 'User Not Found');
      });
  };
  return (
    <div className="bg-white shadow rounded-3xl w-full p-8 max-w-lg">
      <p
        tabIndex={0}
        aria-label="Login to your account"
        className="text-2xl font-extrabold leading-6 text-gray-800">
        Recover your password
      </p>
      {/* <p className="text-sm mt-4 font-medium leading-none text-gray-500">
        Dont have account?{' '}
        <span
          tabIndex={0}
          role="link"
          aria-label="Sign up here"
          className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
          onClick={() => changeScreen(0)}>
          {' '}
          Sign up here
        </span>
      </p> */}
      {alert.length > 0 ? <Error isGood={true}>{alert}</Error> : ''}
      <div className="flex flex-col justify-between mt-3">
        <TextField
          label="Email"
          setValue={updateEmail}
          name="email"
          type="text"
          autoComplete="username"
          errorMsg={emailError}
        />
      </div>

      <SubmitBtn label="Reset Password" onClick={sendEmail} className="mt-3" />
      <SubmitBtn
        className="bg-gray-200 text-black mt-3  hover:bg-gray-600 hover:text-white"
        label="Back"
        onClick={() => {
          setAlert('');
          changeScreen(0);
        }}
      />
    </div>
  );
}
