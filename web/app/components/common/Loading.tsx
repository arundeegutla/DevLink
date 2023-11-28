import { usePathname } from 'next/navigation';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span className="loader"></span>
    </div>
  );
}
