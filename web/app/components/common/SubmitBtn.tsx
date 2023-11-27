import { twMerge } from 'tailwind-merge';

interface SubmitBtnProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export default function SubmitBtn({
  label,
  onClick,
  className,
}: SubmitBtnProps) {
  return (
    <button
      onClick={onClick}
      role="button"
      aria-label={label}
      className={twMerge(
        'text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 mx-2 w-full',
        className
      )}>
      {label}
    </button>
  );
}
