'use client';
/**
 * Shows a project's details. Only accesible if you are in the project. Otherwise,
 * even if it a valid project ID, it will show 404 error.
 */

import { useUser } from '@context/UserContext';
import { useRouter } from 'next/navigation';

export default function ProjectView() {
  const router = useRouter();
  const { fbuser } = useUser();

  return (
    <div className="w-full h-full flex flex-row items-center justify-center">
      <div className="bg-black p-10 rounded-xl m-4 max-w-lg">
        <h1 className="text-2xl">TODO: Project View</h1>
      </div>
    </div>
  );
}
