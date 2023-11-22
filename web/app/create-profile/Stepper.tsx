import { IconType } from 'react-icons';
import { StepProps } from './page';
import { Icons } from '../models/icons';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  name: string;
  icon: IconType;
  onClick: () => void;
  switchIcon?: boolean;
  className?: string;
}

export default function Stepper({ onNext, onBack, onFinish }: StepProps) {
  return (
    <div className="z-10 relative w-96 max-w-screen-md px-24 flex flex-row mt-8 bg-green-400">
      {onBack && (
        <Button
          name="Back"
          className="absolute left-0"
          onClick={onBack}
          icon={Icons.LeftArrowCircleFilled}
          switchIcon={true}
        />
      )}
      {onNext && (
        <Button
          className="absolute right-0"
          name="Next"
          onClick={onNext}
          icon={Icons.RightArrowCircleFilled}
        />
      )}
      {onFinish && (
        <Button
          className="absolute right-0 bg-gray-200 text-gray-900 hover:bg-gray-400 hover:text-black"
          name="Finish"
          onClick={onFinish}
          icon={Icons.RightArrowCircleFilled}
        />
      )}
    </div>
  );
}

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={twMerge(
        `flex ${
          !props.switchIcon ? 'flex-row' : 'flex-row-reverse'
        } p-2 border-2 border-gray-500 items-center gap-2 rounded-lg hover:bg-gray-800 text-gray-300`,
        props.className
      )}>
      {props.name}
      <props.icon />
    </button>
  );
};
