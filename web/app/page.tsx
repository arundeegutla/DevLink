'use client';
// react
import Link from 'next/link';

// components.
import HomeBar from '@components/common/HomeBar';
import Tilt from 'react-parallax-tilt';

// icons
import { BsArrowUpRight } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { PiPaperPlaneTiltFill } from 'react-icons/pi';
import { HiMiniUserGroup } from 'react-icons/hi2';

import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

const infoBlock = [
  {
    label: 'Discover Top Talent',
    className: 'from-[#5279B7] to-[#4299DC]',
    icon: IoDiamond,
    info: 'Connect with top-tier talent across a variety of development roles. Expand your projects by tapping into our vibrant community of highly skilled developers.',
  },
  {
    label: 'Real-time Collaboration',
    className: 'from-[#D4C15D] to-[#FFFDEF]',
    icon: PiPaperPlaneTiltFill,
    info: 'Seamless collaboration with our code sharing and instant messaging systens enables efficient teamwork across the world.',
  },
  {
    label: 'About Our Team',
    className: 'from-[#e08686] to-[#b3aaaa]',
    icon: HiMiniUserGroup,
    info: 'Student developers uniting for innovation. Join us in creating, connecting, and collaborating on meaningful projects.',
  },
];

export default function Landing() {
  return (
    <>
      <main className="relative w-screen h-screen">
        <HomeBar />
        <Image
          width={0}
          height={0}
          style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
          className="fixed top-0 left-0"
          src="https://images.unsplash.com/photo-1656077217715-bdaeb06bd01f?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background"
        />
        <div className="blur-20 rounded-b-2xl bg-[#000000af] pb-3 mx-auto ">
          <div className="px-20 mb-6 w-fit transition-[2s] mx-auto text-[#fffc]">
            <h1 className="text-6xl pt-32">Connect, Collaborate and Code</h1>
            <h1 className="text-6xl mt-8">together with Developers</h1>
            <Link
              href={{ pathname: '/auth', query: { signup: true } }}
              className="mx-auto">
              <button className="my-button flex flex-row items-center p-2 px-4 border-2 border-gray-500 rounded-lg transition-[2s] font-normal hover:bg-white hover:text-black mt-10">
                Get Started
                <BsArrowUpRight className="ml-2" />
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-row items-stretch justify-center px-8 mx-auto flex-wrap ">
          {infoBlock.map((x, indx) => (
            <Tilt
              key={indx}
              className="blur-20 rounded-2xl bg-[#000000af] p-3 my-3 w-96 mx-3 cursor-default border-2 border-gray-600"
              tiltReverse={true}
              glareMaxOpacity={0}
              transitionSpeed={5000}>
              {/* header */}
              <div className="flex flex-row justify-between items-center bg-[#c1c1c115] rounded-full">
                <h1
                  className={twMerge(
                    `bg-gradient-to-r bg-clip-text text-transparent text-xl font-semibold whitespace-nowrap ml-3 mr-10`,
                    `${x.className}`
                  )}>
                  {x.label}
                </h1>
                <div className="rounded-full p-3 bg-[#c1c1c12a]">
                  <x.icon className="text-2xl text-[#C1C1C1]" />
                </div>
              </div>
              <div className="w-full pr-10 py-10 text-[#C1C1C1] ml-3">
                {x.info}
              </div>
            </Tilt>
          ))}
        </div>
      </main>
    </>
  );
}
