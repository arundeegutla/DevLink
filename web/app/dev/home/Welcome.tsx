import { Icons } from '@/models/icons';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

const Welcome = ({
  showNewProject,
}: {
  showNewProject: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="bg-black p-10 rounded-xl m-4 max-w-lg border-2 border-gray-700">
        <h1 className="text-2xl text-gray-300">Welcome 👋</h1>
        <p className="text-gray-400 mt-3">
          Explore existing projects or kick off a new one to start your journey
          of collaboration and innovation.
        </p>
        <div className="flex flex-row gap-4 mt-4">
          <Link href={'/dev/explore'}>
            <button className="px-4 py-2 border-gray-600 border-2 flex flex-row rounded-lg bg-gray-300 text-black hover:bg-black hover:text-white gap-3 transition-all duration-500 ease-in-out">
              <Icons.Explore className="text-2xl" />
              <div>Explore</div>
            </button>
          </Link>
          <button
            onClick={(event) => showNewProject(true)}
            className="px-4 py-2 border-gray-600 border-2 flex flex-row rounded-lg bg-gray-300 text-black hover:bg-black hover:text-white gap-3 transition-all duration-500 ease-in-out">
            <Icons.Plus className="text-2xl" />
            <div>Create Project</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
