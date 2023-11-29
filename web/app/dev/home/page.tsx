'use client';
/**
 * Page with current projects of the user.
 */

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFBUser } from '@context/FBUserContext';
import ProjectList from './ProjectList';
import Welcome from './Welcome';
import NewProject from './NewProject';
import { useGetUser } from '@/hooks/users';
import Loading from '@components/common/Loading';
import { useDLUser } from '@context/DLUserContext';

export default function Home() {
  const router = useRouter();
  const { fbuser } = useFBUser();
  const { user } = useDLUser();
  const [newProject, showNewProject] = useState(false);

  console.log('Logged in as: ' + user.firstName);
  return (
    <div className="relative w-full h-full flex flex-col pt-10 pl-3">
      <div className="mb-4 text-4xl font-normal text-[#ffffff">Dashboard</div>
      {!user?.groups || user?.groups.length === 0 ? (
        <Welcome showNewProject={showNewProject} />
      ) : (
        <ProjectList projects={user?.groups} showNewProject={showNewProject} />
      )}
      {newProject && <NewProject showNewProject={showNewProject} />}
    </div>
  );
}
