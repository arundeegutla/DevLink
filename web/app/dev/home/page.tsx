'use client';
/**
 * Page with current projects of the user.
 */

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@context/UserContext';
import ProjectList from './ProjectList';
import Welcome from './Welcome';
import NewProject from './NewProject';

export default function Home() {
  const router = useRouter();
  const { fbuser, user } = useUser();
  const [newProject, showNewProject] = useState(false);

  console.log('Logged in as: ' + fbuser.displayName);
  return (
    <div className="relative w-full h-full flex flex-col pt-10 pl-3">
      <div className="mb-4 text-4xl font-normal text-[#ffffff]">Dashboard</div>
      {!user?.groups || user?.groups.length === 0 ? (
        <Welcome showNewProject={showNewProject} />
      ) : (
        <ProjectList projects={user?.groups} showNewProject={showNewProject} />
      )}
      {newProject && <NewProject showNewProject={showNewProject} />}
    </div>
  );
}
