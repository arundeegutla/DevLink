import { User } from 'firebase/auth';
import { StepProps } from './page';
import Stepper from '@components/common/Stepper';

export default function ChangeServices({
  onFinish,
  onBack,
  curUser,
}: StepProps & { curUser: User }) {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold text-gray-300">Showcase Your Work</h1>
      <h1 className="text-md w-[40%] text-gray-500 text-center mt-3">
        Share your projects and achievements by updating your portfolio links
      </h1>
      <Stepper onFinish={onFinish} onBack={onBack} />
    </div>
  );
}
