'use client';
/**
 * Displays the logged in user's profile. Pfp, contact information, linked platforms,
 * current posts, current projects, and skills.
 */

// External Components
import Tilt from 'react-parallax-tilt';
import Loading from '@components/common/Loading';

// Icons
import { FaUser } from 'react-icons/fa';

// Auth
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Account() {
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

  const getProfilePic = () => {
    if (!user) {
      return (
        <FaUser className="w-full border border-[#4e4e4e] rounded-full" />
      )
    }
    return (
      <img
        src={
          user.photoURL ??
          'https://s3-symbol-logo.tradingview.com/alphabet--600.png'
        }
        className="h-36 w-full border border-[#4e4e4e] rounded-full"
        alt="Profile Picture"
      />
    )
  }

  return (
    <div className="w-full h-full flex flex-col pl-8 pr-12 py-8">
      {/* Top div for user info */}
      <div className="w-full h-1/3 flex items-center bg-[#252525] rounded-xl overflow-hidden p-4">
        <div className="w-2/3 h-full flex items-center">
          {/* User profile picture (tilt cause why not)*/}
          <Tilt
            tiltReverse={true}
            glareMaxOpacity={0}
            transitionSpeed={1000}
          >
            <div className="ml-2 mr-8">
              {getProfilePic()}
            </div>
          </Tilt>
          {/* User names and roles */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-semibold">DISPLAY NAME</h1>
            <h3 className="text-2xl font-semibold mt-2">ROLE / PROFILE DESCRIPTION</h3>
          </div>
        </div>
        {/* TODO: change to div and include images for email, phone, linkedin, github */}
        <div className="w-1/3 h-full flex flex-col justify-between bg-[#1f1f1f] rounded-xl p-4">
          <h1>EMAIL</h1>
          <h1>PHONE#</h1>
          <h1>LINKEDIN</h1>
          <h1>GITHUB</h1>
        </div>
      </div>
      {/* Bottom div for posts/projects view and skills section */}
      <div className="w-full h-full flex flex-row justify-between mt-12">
        <div className="w-2/3 h-full flex flex-col text-3xl font-semibold bg-[#252525] rounded-xl items-center mr-12 p-2">
          Posts / Projects
          <hr className="my-1 border-t-2 w-full border-[#3b3b3b]" />
        </div>
        <div className="w-1/3 h-full flex flex-col text-3xl font-semibold bg-[#252525] rounded-xl items-center p-2">
          Skills
          <hr className="my-1 border-t-2 w-full border-[#3b3b3b]" />
        </div>
      </div>
    </div>
  );
}
