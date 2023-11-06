'use client';
/**
 * Email Verification page
 */

//react
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

// components
import Loading from '@components/common/Loading';
import SubmitBtn from '@components/common/SubmitBtn';
import Alert from '../../components/common/Alert';

// auth
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { errorMsg } from '@/firebase/authErrors';

export default function Home() {
  const router = useRouter();
  const [emailAlert, setEmailAlert] = useState({
    label: '',
    isGood: false,
    isWarning: false,
  });
  const [user, loading, error] = useAuthState(auth);
  if (user && user.emailVerified) {
    router.push('/dev/home');
    return <Loading />;
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    router.push('/');
    console.log('no user signed in');
    return <Loading />;
  }

  const sendEmail = async () => {
    if (!user) return;
    await sendEmailVerification(user)
      .then((e) => {
        setEmailAlert({
          label: 'Sent Email Verification',
          isGood: true,
          isWarning: false,
        });
      })
      .catch((error) => {
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setEmailAlert({
          label: msg ?? 'There was an error sending email',
          isGood: false,
          isWarning: false,
        });
      });
  };

  return (
    <div className="w-full h-full flex flex-row items-center justify-center">
      <div className="bg-black p-10 rounded-xl m-4 max-w-lg">
        <h1 className="text-2xl">Verify Your Email</h1>
        <p className="text-gray-400 mt-3 font-semibold">{user?.email ?? ''}</p>
        <p className="text-gray-400 mt-3">
          To complete your registration, please check your inbox for a
          verification email and click the verification link inside.
        </p>
        {emailAlert.label ? (
          <Alert isGood={emailAlert.isGood} isWarning={emailAlert.isWarning}>
            {emailAlert.label}
          </Alert>
        ) : (
          ''
        )}
        <SubmitBtn
          onClick={sendEmail}
          label="Resend Verification"
          className="max-w-xs bg-white text-black hover:bg-black hover:text-white mt-3"
        />
      </div>
    </div>
  );
}
