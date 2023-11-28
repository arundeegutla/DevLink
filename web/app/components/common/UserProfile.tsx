// External Components
import Tilt from 'react-parallax-tilt';
import InfoBlock from './InfoBlock';
import ProfilePageProject from './ProfilePageProject';

// Icons
import {
  FaUser,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';
import { IoMdMail } from "react-icons/io";

export interface UserProfile {
  isSelfProfile: boolean;
  user: any
}

export default function UserProfile({
  isSelfProfile,
  user,
}: UserProfile) {

  const getProfilePic = () => {
    if (!user) {
      return (
        <FaUser className="h-36 w-36 border border-[#4e4e4e] rounded-full" />
      )
    }
    return (
      <img
        src={
          isSelfProfile ?
          (user.photoURL ??
          'https://s3-symbol-logo.tradingview.com/alphabet--600.png') :
           // TODO: Get other user's profile picture - temporary placeholder
          'https://s3-symbol-logo.tradingview.com/alphabet--600.png'
        }
        className="h-36 w-36 border border-[#4e4e4e] rounded-full"
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
            <div className="ml-2 mr-8">{getProfilePic()}</div>
          </Tilt>
          {/* User names and roles */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-semibold">DISPLAY NAME</h1>
          </div>
        </div>
        {/* Info block to hold user's information */}
        <div className="w-1/3 h-full flex flex-col justify-evenly bg-[#1f1f1f] rounded-xl p-4">
          { isSelfProfile && <InfoBlock infoLink="put ur email here" Icon={IoMdMail} /> }
          <InfoBlock infoLink="put ur linkedin here" Icon={FaLinkedin} />
          <InfoBlock infoLink="put ur github here" Icon={FaGithub} />
        </div>
      </div>
      {/* Bottom div for posts/projects view and skills section */}
      <div className="w-full h-full flex flex-row justify-between mt-12">
        <div className="w-2/3 h-full flex flex-col text-3xl font-semibold bg-[#252525] rounded-xl items-center mr-12 p-2 overflow-y-scroll">
          <h1>Projects</h1>
          <hr className="mt-1 border-t-2 w-full border-[#3b3b3b]" />
          <div className="w-full h-full flex flex-col px-1">
            <ProfilePageProject id="1" title="DevLink" color="red" description="project" />
            <ProfilePageProject id="2" title="other project" color="blue" description="Harnessing cutting-edge algorithms to create harmonious melodies that adapt in real-time to users' moods and preferences." />
          </div>
        </div>
        {/* TODO: Fill skill section with arun's skills components */}
        <div className="w-1/3 h-full flex flex-col text-3xl font-semibold bg-[#252525] rounded-xl items-center p-2 overflow-y-scroll">
          <h1>Skills</h1>
          <hr className="my-1 border-t-2 w-full border-[#3b3b3b]" />
        </div>
      </div>
    </div>
  );
}