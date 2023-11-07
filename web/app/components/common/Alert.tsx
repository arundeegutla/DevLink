import { twMerge } from 'tailwind-merge';
import { MdError } from 'react-icons/md';
import { MdDangerous } from 'react-icons/md';
import { GrStatusGood } from 'react-icons/gr';

interface AlertProps {
  isGood?: boolean;
  isWarning?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Alert({
  isGood,
  isWarning,
  children,
  className,
}: AlertProps) {
  return (
    <div
      className={twMerge(
        'w-fit flex flex-row items-center justify-center mt-3 text-black bg-red-200 p-2 rounded-xl',
        className +
          (isGood ? ' bg-green-200' : isWarning ? ' bg-orange-200' : '')
      )}>
      {isGood ? (
        <GrStatusGood className="text-2xl mr-2" />
      ) : isWarning ? (
        <MdError className="text-2xl mr-2" />
      ) : (
        <MdDangerous className="text-2xl mr-2" />
      )}
      {children}
    </div>
  );
}
