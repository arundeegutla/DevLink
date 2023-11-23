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
import { HiOutlinePlus } from 'react-icons/hi';
import { useEffect } from 'react';

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
  const [user, loading, error] = useAuthState(auth);

  // useEffect(() => {
  //   // Function to perform a hard reload
  //   const hardReload = () => {
  //     window.location.reload();
  //   };

  //   // Call the hard reload function
  //   hardReload();
  // }, []);

  if (user) {
    if (!user.emailVerified) {
      router.push('/create-profile');
      return <Loading />;
    }
  } else if (loading) {
    return <Loading />;
  } else if (!user || error) {
    router.push('/');
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col mt-10 pl-3">
      <div className="mb-4 text-4xl font-normal text-[#ffffff]">Dashboard</div>

      <div className="flex flex-row flex-wrap transition-all duration-300 ease-in-out mb-11">
        {tempProjects.map((item, indx) => (
          <ProjectCard key={indx} {...item} />
        ))}
        <Tilt
          tiltReverse={true}
          glareMaxOpacity={0}
          transitionSpeed={5000}
          className={`relative rounded-lg mr-4 mt-4 bg-[#22222253] p-2 cursor-pointer overflow-hidden w-80 hover:bg-[#2222229e] flex items-center justify-center`}>
          <div className="relative z-10 flex flex-col items-center justify-center p-5 cursor-pointer rounded-xl">
            <HiOutlinePlus className="text-6xl text-gray-300" />
            <h1 className="mt-2">Add Project</h1>
          </div>
        </Tilt>
      </div>
    </div>
  );
}
