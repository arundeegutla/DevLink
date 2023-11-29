import { User, sendEmailVerification } from 'firebase/auth';
import { StepProps } from './page';
import Stepper from '@components/common/Stepper';
import { errorMsg } from '@/firebase/authErrors';
import SubmitBtn from '@components/common/SubmitBtn';
import { use, useEffect, useState } from 'react';
import { AlertProps } from '@components/common/Alert';
import Alert from '@components/common/Alert';
import { useFBUser } from '@context/FBUserContext';

export function VerifyStep({ onBack, onFinish }: StepProps) {
  const { fbuser } = useFBUser();

  const [emailAlert, setEmailAlert] = useState<AlertProps>({
    children: '',
    alertType: 'warning',
  });

  const [verified, setVerified] = useState(fbuser.emailVerified);

  const sendEmail = () => {
    sendEmailVerification(fbuser)
      .then((e) => {
        setEmailAlert({
          children: 'Sent Email Verification',
          alertType: 'good',
        });
      })
      .catch((error) => {
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setEmailAlert({
          children: msg ?? 'There was an error sending email',
          alertType: 'danger',
        });
      });
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!verified) {
        await fbuser.reload().then(() => {
          setVerified(fbuser.emailVerified);
        });
      } else {
        clearInterval(intervalId);
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fbuser, verified]);

  const submit = () => {
    if (!verified) {
      setEmailAlert({
        children: 'Email not verified',
        alertType: 'warning',
      });
      return;
    }
    onFinish && onFinish();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold text-gray-300">Secure Your Profile</h1>
      <h1 className="text-md w-[40%] text-gray-500 text-center mt-3">
        To complete your registration, please check your inbox for a
        verification email and click the verification link inside
      </h1>

      <div className="w-[40%] flex flex-col items-center">
        <p className="text-gray-400 mt-3 font-semibold">{fbuser.email ?? ''}</p>

        <div className="flex flex-row p-2 bg-slate-700 items-center rounded-lg mt-3 border-gray-500 border-2">
          <div className="mr-3 text-lg">Status</div>
          <Alert className="my-0" alertType={verified ? 'good' : 'danger'}>
            {verified ? 'Verified' : 'Not Verified'}
          </Alert>
        </div>

        {!verified && (
          <div className="flex flex-col items-center">
            <SubmitBtn
              onClick={sendEmail}
              label="Send Verification"
              className="max-w-xs w-48 bg-white text-black hover:bg-black hover:text-white mt-3"
            />
            {emailAlert.children && (
              <Alert className="mb-3" {...emailAlert}>
                {emailAlert.children}
              </Alert>
            )}
          </div>
        )}
      </div>
      <Stepper onBack={onBack} onFinish={submit} />
    </div>
  );
}
