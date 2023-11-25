import { StepProps } from './page';
import Stepper from '@components/common/Stepper';

export default function ConnectServices({ onNext, onBack }: StepProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold text-gray-300">Expand Your Reach</h1>
      <h1 className="text-md w-[40%] text-gray-500 text-center mt-3">
        Connect your profile with other platforms or services to showcase a more
        comprehensive view of your professional self
      </h1>
      <Stepper onNext={onNext} onBack={onBack} />
    </div>
  );
}
