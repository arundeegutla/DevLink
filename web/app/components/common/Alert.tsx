import { twMerge } from 'tailwind-merge';
import { Icons } from '@models/icons';

export interface AlertProps {
  alertType: 'good' | 'warning' | 'danger';
  children: React.ReactNode;
  className?: string;
}

export default function Alert({ alertType, children, className }: AlertProps) {
  return (
    <div
      className={twMerge(
        'w-fit flex flex-row items-center justify-center mt-3 text-black p-2 rounded-xl',
        className +
          ' ' +
          (alertType === 'good'
            ? 'bg-green-200'
            : alertType === 'warning'
            ? 'bg-orange-200'
            : alertType === 'danger'
            ? 'bg-red-200'
            : '')
      )}>
      {alertType === 'good' ? (
        <Icons.CheckCircle className="text-2xl mr-2" />
      ) : alertType === 'warning' ? (
        <Icons.Warning className="text-2xl mr-2" />
      ) : alertType === 'danger' ? (
        <Icons.Danger className="text-2xl mr-2" />
      ) : (
        ''
      )}
      {children}
    </div>
  );
}
