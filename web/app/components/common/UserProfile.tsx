'use client';
// External Components
import Tilt from 'react-parallax-tilt';
import InfoBlock from './InfoBlock';
import ProfilePageProject from './ProfilePageProject';

// Icons
import { FaUser, FaLinkedin, FaGithub } from 'react-icons/fa';
import { User } from '@/hooks/models';
import Image from 'next/image';
import { Icons, skillMap } from '@/models/icons';
import { useEffect, useState } from 'react';
import { defaultImageURL, getPhotoURL } from '@/hooks/users';
import ProjectCard from './ProjectCard';
import SkillsStep, { Skill } from '../../dev/settings/SkillsStep';

export interface UserProfile {
  user: User;
  id: string;
}

export default function UserProfile({ user, id }: UserProfile) {
  const [imageURL, setImageURL] = useState<string>(defaultImageURL);

  useEffect(() => {
    const getImage = async () => {
      const url = await getPhotoURL(id);
      setImageURL(url);
    };
    getImage();
  }, [id]);

  const getProfilePic = () => {
    return (
      <Image
        width={0}
        height={0}
        src={imageURL}
        className="h-36 w-36 border border-[#4e4e4e] rounded-full"
        alt="Profile Picture"
      />
    );
  };

  return (
    <div className="w-full h-full flex flex-col pl-8 pr-12 py-8">
      {/* Top div for user info */}
      <div className="w-full h-1/3 flex items-center bg-[#252525] rounded-xl p-4 min-h-fit">
        <div className="w-2/3 h-full flex items-center">
          {/* User profile picture (tilt cause why not)*/}
          <Tilt tiltReverse={true} glareMaxOpacity={0} transitionSpeed={1000}>
            <div className="ml-2 mr-8">{getProfilePic()}</div>
          </Tilt>
          {/* User names and roles */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-semibold">
              {user.firstName + ' ' + user.lastName}
            </h1>
          </div>
        </div>
        {/* Info block to hold user's information */}
        <div className="w-1/3 h-full flex flex-col justify-evenly bg-[#1f1f1f] rounded-xl p-4">
          <InfoBlock
            href={`mailto: ${user.email}`}
            content={user.email ?? 'No email'}
            Icon={Icons.Email}
          />
          <InfoBlock
            href={user.linkedin ?? 'https://www.linkedin.com'}
            content={user.linkedin ?? 'linkedin.com'}
            Icon={Icons.LinkedIn}
          />
          <InfoBlock
            href={
              'https://github.com/' + (user.github?.replaceAll('@', '') ?? '')
            }
            content={user.github ?? 'www.github.com'}
            Icon={Icons.GitHub}
          />
        </div>
      </div>
      {/* Bottom div for posts/projects view and skills section */}
      <div className="w-full h-full flex flex-row justify-between mt-12">
        {/* TODO: Fill skill section with arun's skills components */}
        <div className="w-1/3 h-fit flex flex-col text-3xl font-normal rounded-xl items-start p-5 overflow-y-scroll mr-4">
          <h1>Skills</h1>
          <div className="animated animatedFadeInUp fadeInUp mt-4 w-full flex flex-row flex-wrap items-start justify-start transition-all duration-500 ease-in-out text-lg font-normal">
            {user.skills.length > 0
              ? user.skills.map((skill, indx) => {
                  const skilltype = skillMap[skill] ?? {
                    name: skill,
                    color: 'not found',
                    icon: Icons.Heart,
                  };
                  return (
                    <Skill
                      key={indx}
                      {...skilltype}
                      isSelected={true}
                      onClick={() => {}}
                    />
                  );
                })
              : 'No skills found :('}
          </div>
        </div>
        <div className="w-2/3 h-fit flex flex-col text-3xl font-medium rounded-xl items-start mr-12 p-2 pb-10">
          <h1>Projects</h1>
          <div className="w-full h-full flex flex-row flex-wrap px-1">
            {user.groups.length > 0
              ? user.groups.map((group, indx) => {
                  return <ProjectCard key={indx} {...group} />;
                })
              : 'No projects'}
          </div>
        </div>
      </div>
    </div>
  );
}
