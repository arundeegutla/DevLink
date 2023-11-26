'use client';
/**
 * Simple search page for posts. Uses tag selection to filter through posts.
 * Similar to stack overflow but only with tag names: https://i.stack.imgur.com/8fYRk.png
 * Recommends popular tags if the search bar is empty
 */

import { auth } from '@/firebase/clientApp';
import Loading from '@components/common/Loading';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Post, samplePosts } from '@models/samples/posts';
import { skills, SkillType, Icons } from '@models/icons';
import { useEffect, useRef, useState } from 'react';
import PostCard from '@components/common/PostCard';
import SkillsDropdown from './SkillsDropdown';
import Skill from './Skill';
import { useUser } from '@context/UserContext';

export default function ExploreView() {
  const router = useRouter();
  const { fbuser, user } = useUser();
  const [results, setResults] = useState<Post[]>();
  const [searchVal, setSearchVal] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    user?.skills ?? []
  );
  let posts = samplePosts;
  let mySkills = skills;

  useEffect(() => {
    const handleResultsChange = () => {
      setResults(() => {
        return posts.filter((post) => {
          if (
            !(
              post.body.toLowerCase().includes(searchVal.toLowerCase()) ||
              post.project.title
                .toLowerCase()
                .includes(searchVal.toLowerCase()) ||
              post.project.owner.name
                .toLowerCase()
                .includes(searchVal.toLowerCase()) ||
              post.title.toLowerCase().includes(searchVal.toLowerCase())
            )
          ) {
            return false;
          }
          let has = selectedSkills.some((skill) => {
            return post.skillsWanted.includes(skill);
          });
          return has;
        });
      });
    };
    handleResultsChange();
  }, [posts, searchVal, selectedSkills]);

  const handleSkillClick = (selectedSkill: SkillType) => {
    setSelectedSkills((skills) => {
      return skills.filter((skill) => skill !== selectedSkill.name);
    });
  };

  const handleSearchClick = () => {
    inputRef.current?.blur();
    setSearchVal(inputRef.current?.value ?? '');
  };

  const resetSkills = () => {
    setSelectedSkills(user?.skills ?? []);
  };

  return (
    <div className="w-full flex flex-col mt-10 pl-3 mb-6 h-full">
      <div className="mb-4 text-4xl font-normal text-[#ffffff]">Explore</div>
      <div className="flex flex-row h-full">
        {/* Search */}
        <div className="h-full relative w-60 min-w-fit flex flex-col items-stretch pr-7 border-r-2 border-gray-700">
          <div className="flex flex-row rounded-xl bg-gray-700 text-black">
            <input
              type="search"
              ref={inputRef}
              placeholder="Search Posts"
              className="relative bg-transparent focus:outline-none w-60 m-3 text-white"
              onKeyDown={(event) => {
                event.key === 'Enter' && handleSearchClick();
              }}
            />
            <div
              onClick={handleSearchClick}
              className="transition-all duration-200 ease-in-out px-2 w-10 aspect-square text-gray-400 bg-gray-500 rounded-sm text-3xl flex flex-row items-center cursor-pointer justify-center hover:bg-white rounded-r-xl">
              <Icons.Search />
            </div>
          </div>
          <div className="relative">
            <SkillsDropdown
              className="absolute z-20 top-0 select-none"
              mySkills={mySkills}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
            />
            <div className="pt-16 flex flex-row flex-wrap items-start w-60">
              {selectedSkills.length !== 0 ? (
                mySkills.map((x) => {
                  return !selectedSkills.some((skill) => skill == x.name) ? (
                    ''
                  ) : (
                    <Skill
                      key={x.name}
                      {...x}
                      isSelected={true}
                      onClick={() => handleSkillClick(x)}
                      shouldHover={false}
                    />
                  );
                })
              ) : (
                <div className="text-gray-500 p-2">
                  {user!.skills.length > 0 ? (
                    <div
                      onClick={resetSkills}
                      className="mt-4 px-5 py-2 rounded-full bg-gray-900 text-gray-200 cursor-pointer hover:bg-gray-700 border-gray-700 border-2">
                      Add My Skills
                    </div>
                  ) : (
                    'Add Skills to refine search'
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Posts */}
        <div className="ml-2 flex flex-col w-full mr-2">
          <div className="flex flex-row space-x-1 items-center rounded-full bg-gray-700 w-fit pr-2">
            <div className="w-10 h-10 rounded-full bg-white text-gray-800 flex flex-row items-center justify-center text-2xl font-semibold">
              {results?.length ?? 0}
            </div>
            <div className="text-md text-gray-200">
              result{(results?.length || 0) != 1 && 's'} found
            </div>
          </div>
          <hr className="mt-2 border-t-2 w-full border-gray-700" />
          <div className="mt-2 flex flex-col flex-wrap items-stretch transition-all duration-500 ease-in-out">
            {results?.map((x, indx) => (
              <PostCard key={x.title} post={x}></PostCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
