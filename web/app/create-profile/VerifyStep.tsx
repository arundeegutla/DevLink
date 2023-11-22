import { User, sendEmailVerification } from 'firebase/auth';
import { StepProps } from './page';
import Stepper from './Stepper';
import { errorMsg } from '@/firebase/authErrors';
import SubmitBtn from '@components/common/SubmitBtn';
import { useEffect, useState } from 'react';
import { AlertProps } from '@components/common/Alert';
import Alert from '@components/common/Alert';

export function VerifyStep({
  onBack,
  onFinish,
  curUser,
}: StepProps & { curUser: User }) {
  const [emailAlert, setEmailAlert] = useState<AlertProps>({
    children: '',
    alertType: 'warning',
  });

  const [verified, setVerified] = useState(curUser.emailVerified);

  useEffect(() => {
    sendEmail();
  });

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!verified) {
        await curUser.reload().then(() => {
          setVerified(curUser.emailVerified);
        });
      } else {
        clearInterval(intervalId);
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [curUser, verified]);

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
  const sendEmail = async () => {
    await sendEmailVerification(curUser)
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

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold text-gray-300">Secure Your Profile</h1>
      <h1 className="text-md w-[40%] text-gray-500 text-center mt-3">
        To complete your registration, please check your inbox for a
        verification email and click the verification link inside
      </h1>

      <div className="w-[40%] flex flex-col items-center">
        <p className="text-gray-400 mt-3 font-semibold">
          {curUser.email ?? ''}
        </p>

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
              label="Resend Verification"
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
