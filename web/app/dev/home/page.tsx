'use client';
/**
 * Page with current projects of the user.
 */

//react
import { useRouter } from 'next/navigation';

// components
import Loading from '@components/common/Loading';
import { ProjectCardProps } from '@components/common/ProjectCard';
import ProjectCard from '@components/common/ProjectCard';
import Tilt from 'react-parallax-tilt';

// auth
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

// icons
import { useEffect, useState } from 'react';
import { Icons } from '@models/icons';
import { User } from 'firebase/auth';
import { getUser } from '@/hooks/users';
import * as models from '@/hooks/models';
import { useUser } from '@context/UserContext';
import SubmitBtn from '@components/common/SubmitBtn';
import Link from 'next/link';

const tempProjects: ProjectCardProps[] = [
  {
    id: '1',
    title: 'Alg0Run',
    color: 'red',
    role: 'Front-End Engineer',
  },
  {
    id: '2',
    title: 'Social Media App',
    color: 'blue',
    role: 'Frontend Developer',
  },
  {
    id: '3',
    title: 'Task Management System',
    color: 'orange',
    role: 'Backend Developer',
  },
  {
    id: '4',
    title: 'Portfolio Website',
    color: 'purple',
    role: 'UI/UX Designer',
  },
  {
    id: '10',
    title: 'Travel Buddy App',
    color: 'teal',
    role: 'Mobile App Developer',
  },
  {
    id: '11',
    title: 'AI-driven Chatbot',
    color: 'purple',
    role: 'Machine Learning Engineer',
  },
  {
    id: '12',
    title: 'Virtual Reality Experience',
    color: 'orange',
    role: 'VR/AR Developer',
  },
  {
    id: '16',
    title: 'Fitness Tracking App',
    color: 'pink',
    role: 'HealthTech Developer',
  },
];

export default function Home() {
  const router = useRouter();
  const { fbuser, user } = useUser();

  console.log('Logged in as: ' + fbuser.displayName);
  console.log(user?.groups);
  return (
    <div className="w-full h-full flex flex-col pt-10 pl-3">
      <div className="mb-4 text-4xl font-normal text-[#ffffff]">Dashboard</div>
      {!user?.groups || user?.groups.length === 0 ? (
        <Welcome />
      ) : (
        <ListOfProjects projects={user?.groups} />
      )}
    </div>
  );
}

const ListOfProjects = ({ projects }: { projects: models.Group[] }) => {
  return (
    <div className="flex flex-row flex-wrap transition-all duration-300 ease-in-out mb-11">
      {projects.map((item, indx) => (
        <ProjectCard
          key={indx}
          id={item.name}
          color="#fff"
          role={'Front-End Engineer'}
          title={item.name}
        />
      ))}
      <Tilt
        tiltReverse={true}
        glareMaxOpacity={0}
        transitionSpeed={5000}
        className={`relative rounded-lg mr-4 mt-4 bg-[#22222253] p-2 cursor-pointer overflow-hidden w-80 hover:bg-[#2222229e] flex items-center justify-center`}>
        <div className="relative z-10 flex flex-col items-center justify-center p-5 cursor-pointer rounded-xl">
          <Icons.Plus className="text-6xl text-gray-300" />
          <h1 className="mt-2">Add Project</h1>
        </div>
      </Tilt>
    </div>
  );
};

const Welcome = () => {
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
            <button className="px-4 py-2 border-gray-600 border-2 flex flex-row rounded-lg bg-gray-300 text-black hover:bg-black hover:text-white">
              <Icons.Explore className="text-2xl" />
              <div>Explore</div>
            </button>
          </Link>
          <button className="px-4 py-2 border-gray-600 border-2 flex flex-row rounded-lg bg-gray-300 text-black hover:bg-black hover:text-white">
            <Icons.Plus className="text-2xl" />
            <div>Create Project</div>
          </button>
        </div>
      </div>
    </div>
  );
};
