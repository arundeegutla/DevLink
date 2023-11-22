'use client'; // This is a client component 👈🏽

import { useRouter } from 'next/navigation';
import Loading from '@components/common/Loading';
import { useState, useEffect, use } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import HomeBar from '@components/common/HomeBar';
import { User } from 'firebase/auth';

import ProgressBar from './ProgressBar';
import InfoStep from './InfoStep';
import SkillsStep from './SkillsStep';
import ConnectServices from './ConnectServices';
import { VerifyStep } from './VerifyStep';

export interface StepProps {
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
}

export default function CreateProfilePage() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [currentStep, setCurrentStep] = useState(0);

  const handleFinish = () => {
    router.push('/dev/home');
  };
  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(steps.length - 1, prevStep + 1));
  };
  const handleBackStep = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
  };

  if (user) {
  } else if (loading) {
    return <Loading />;
  } else if (!user || error) {
    router.push('/');
    return <Loading />;
  }

  const steps = [
    <InfoStep onNext={handleNextStep} curUser={user} key={'info-step'} />,
    <SkillsStep
      onNext={handleNextStep}
      onBack={handleBackStep}
      curUser={user}
      key={'skills-step'}
    />,
    <ConnectServices
      onNext={handleNextStep}
      onBack={handleBackStep}
      curUser={user}
      key={'service-step'}
    />,
    <VerifyStep
      onBack={handleBackStep}
      onFinish={handleFinish}
      curUser={user}
      key={'verify-step'}
    />,
  ];

  return (
    <>
      <main className="relative w-screen h-screen">
        <HomeBar className="backdrop-blur-[40px]" />
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
        <div className="absolute top-0 w-screen h-screen bg-[#0f0f0f]"></div>
      </main>
    </>
  );
}
