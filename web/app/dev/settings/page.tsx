'use client'; // This is a client component 👈🏽

import { useRouter } from 'next/navigation';
import Loading from '@components/common/Loading';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

import InfoStep from './InfoStep';
import SkillsStep from './SkillsStep';
import ChangeServices from './ChangeServices';
import ProgressBar from '@components/common/ProgressBar';
import { useUser } from '@context/UserContext';
import { editProfile } from '@/hooks/users';

export interface StepProps {
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
}

export default function SettingsPage() {
  const router = useRouter();
  const { fbuser, user, refetchUser } = useUser();

  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [phone, setPhone] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  let displayName = fbuser.displayName ?? '';
  const nameArray = displayName.split(' ');
  let firstName = '';
  let lastName = '';
  if (nameArray.length === 1) {
    firstName = nameArray[0];
  } else if (nameArray.length >= 2) {
    firstName = nameArray.shift() ?? '';
    lastName = nameArray.join(' ') ?? '';
  }

  const handleFinish = async () => {
    setLoading(true);
    await editProfile(fbuser, {
      email: fbuser.email ?? '',
      github,
      skills,
      firstName,
      lastName,
    })
      .then((completed) => {
        if (completed) {
          refetchUser();
          router.push('/dev/home');
        } else {
          console.log('there was an error editing profile');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(steps.length - 1, prevStep + 1));
  };
  const handleBackStep = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const steps = [
    <InfoStep onNext={handleNextStep} key={'info-step'} />,
    <SkillsStep
      retSkills={setSkills}
      onNext={handleNextStep}
      onBack={handleBackStep}
      key={'skills-step'}
    />,
    <ChangeServices
      setGithubPar={setGithub}
      setLinkedinPar={setLinkedin}
      setPhonePar={setPhone}
      onFinish={handleFinish}
      onBack={handleBackStep}
      key={'service-step'}
    />,
  ];

  return (
    <div className="w-full h-full flex flex-row items-center justify-center">
      <div className="relative z-10 flex flex-col items-center h-screen overflow-scroll pt-16 w-full">
        <ProgressBar
          key={'bar'}
          currentStep={currentStep + 1}
          totalSteps={steps.length}
        />
        {steps.map((screen, index) => (
          <div
            key={index}
            className={`w-full ${
              currentStep === index
                ? 'animated animatedFadeInUp fadeInUp'
                : 'hidden'
            }`}>
            {screen}
          </div>
        ))}
      </div>
    </div>
  );
}
