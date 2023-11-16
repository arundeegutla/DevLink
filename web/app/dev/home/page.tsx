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

// auth
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

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
  if (user && !user.emailVerified) {
    router.push('/dev/verify');
    return <Loading />;
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    router.push('/');
    console.log('no user signed in home');
    return <Loading />;
  }
  return (
    <div className="w-full flex flex-col mt-4">
      <div className="mb-4 text-4xl font-semibold text-[#cccccc]">
        Dashboard
      </div>
      {/* Current Projects */}
      <div className="flex flex-row flex-wrap transition-all duration-300 ease-in-out">
        {tempProjects.map((item, indx) => (
          <ProjectCard {...item} />
        ))}
      </div>
    </div>
  );
}
