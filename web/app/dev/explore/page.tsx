'use client';

/**
 * Simple search page for posts. Uses tag selection to filter through posts.
 * Similar to stack overflow but only with tag names: https://i.stack.imgur.com/8fYRk.png
 * Recommends popular tags if the search bar is empty
 */

import Loading from '@components/common/Loading';
import { useRouter } from 'next/navigation';
import { skills, SkillType, Icons } from '@models/icons';
import { useEffect, useRef, useState } from 'react';
import PostCard from '@components/common/PostCard';
import SkillsDropdown from './SkillsDropdown';
import Skill from './Skill';
import { useFBUser } from '@context/FBUserContext';
import { useDLUser } from '@context/DLUserContext';
import { searchPost } from '@/hooks/posts';
import { Post } from '@/hooks/models';
import Error from '@components/common/Error';

export default function ExploreView() {
  const router = useRouter();
  const { user } = useDLUser();
  const { fbuser } = useFBUser();
  const [results, setResults] = useState<Post[]>();
  const [searchVal, setSearchVal] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    user?.skills ?? []
  );

  let mySkills = skills;

  useEffect(() => {
    const handleResultsChange = async () => {
      setLoading(true);
      let posts = (await searchPost(fbuser, selectedSkills)) ?? [];
      setLoading(false);

      setResults(() => {
        return posts.filter((post) => {
          if (user.groups.some((g) => g.id === post.owner.id)) return false;
          if (
            !(
              post.body.toLowerCase().includes(searchVal.toLowerCase()) ||
              post.title.toLowerCase().includes(searchVal.toLowerCase()) ||
              post.owner.name.toLowerCase().includes(searchVal.toLowerCase()) ||
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
  }, [fbuser, searchVal, selectedSkills, user]);

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
    console.log(user.skills);
    setSelectedSkills(user.skills ?? []);
  };

  return (
    <div className="w-full flex flex-col mt-10 pl-3 mb-6 h-full">
      <div className="mb-4 text-4xl font-normal text-[#ffffff]">Explore</div>
      <div className="flex flex-row h-full">
        {/* Search */}
        <div className="h-fit min-h-full relative w-60 min-w-fit flex flex-col items-stretch pr-7 border-r-2 border-gray-700">
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
              {mySkills.map((x) => {
                return (
                  selectedSkills.some((skill) => skill == x.name) && (
                    <Skill
                      key={x.name}
                      {...x}
                      isSelected={true}
                      onClick={() => handleSkillClick(x)}
                      shouldHover={false}
                    />
                  )
                );
              })}
              {!user?.skills?.every((skill) =>
                selectedSkills.includes(skill)
              ) && (
                <div className="text-gray-500 p-2">
                  <div
                    onClick={resetSkills}
                    className="mt-2 px-5 py-2 rounded-full bg-gray-900 text-gray-200 cursor-pointer hover:bg-gray-700 border-gray-700 border-2">
                    Reset My Skills
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Posts */}
        <div className="ml-2 flex flex-col w-full mr-2">
          {loading ? (
            <Loading />
          ) : (
            <div>
              {results?.length !== 0 ? (
                <div>
                  <div className="flex flex-row space-x-1 items-center rounded-full bg-gray-700 w-fit pr-2">
                    <div className="w-10 h-10 rounded-full bg-white text-gray-800 flex flex-row items-center justify-center text-2xl font-semibold">
                      {results?.length ?? 0}
                    </div>
                    <div className="text-md text-gray-200">
                      result{results?.length != 1 && 's'} found
                    </div>
                  </div>
                  <hr className="mt-2 border-t-2 w-full border-gray-700" />
                  <div className="mt-2 flex flex-row gap-3 flex-wrap items-stretch transition-all duration-500 ease-in-out">
                    {results?.map((x, indx) => (
                      <PostCard
                        key={x.title}
                        color={x.owner.color}
                        post={x}
                        numSkillsMatched={
                          selectedSkills.filter((skill) =>
                            x.skillsWanted.includes(skill)
                          ).length
                        }
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center w-fit h-full bg-gray-900 border-2 border-gray-700 py-2 px-4 rounded-lg">
                  <h1 className="text-2xl">{'No Results Found :('}</h1>
                  <h1 className="text-lg text-gray-400">
                    {'Try adding more skills or refine search terms'}
                  </h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
