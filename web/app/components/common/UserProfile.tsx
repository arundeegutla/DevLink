// External Components
import Tilt from 'react-parallax-tilt';

// Icons
import { FaUser } from 'react-icons/fa';

interface UserProfile {
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
        <FaUser className="h-36 w-full border border-[#4e4e4e] rounded-full" />
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
            <h3 className="text-2xl font-medium mt-2">ROLE / PROFILE DESCRIPTION</h3>
          </div>
        </div>
        {
        /*
        TODO: change to div and include images/link accessibility for email, phone, linkedin, github 
              remove email and phone if on other user profile
        */
        }
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