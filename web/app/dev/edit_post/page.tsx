'use client';
/**
 * Page that will show up when user creates new post or edit an existing post.
 * When editing, the editor will be pre-populated with the existing post's markdown.
 */

import { skills, SkillType, Icons } from '@models/icons';
import { useFBUser } from '@context/FBUserContext';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import SkillsDropdown from './SkillsDropdown';
import Skill from './Skill';
import { useDLUser } from '@context/DLUserContext';

export default function EditPostView() {
  const router = useRouter();
  const { fbuser } = useFBUser();
  const { user } = useDLUser();

  const [title, setTitle] = useState<string>('New post for -project title-');
  const [content, setContent] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillClick = (selectedSkill: SkillType) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== selectedSkill.name)
    );
  };

  const submitPost = () => {
    // submit post
  };

  return (
    <div className="w-full h-full pl-3 flex flex-col justify-center py-5">
      <div className="my-5 text-4xl font-normal text-[#ffffff]">
        Creating/Editing post for -project title-
      </div>
      <div className="w-full h-full flex flex-row justify-center gap-3 mt-5 items-start">
        <div className="flex flex-col w-6/12 h-5/6 gap-3 items-center">
          <div className="flex flex-col rounded-xl bg-gray-700 text-black w-full h-15">
            <input
              placeholder="Title"
              className="h-full bg-transparent focus:outline-none m-3 text-white text-left"
              onBlur={(event) => {
                setTitle(event.target.value);
              }}
              value={title}
            />
          </div>
          <div className="flex flex-col rounded-xl bg-gray-700 text-black w-full h-full">
            <textarea
              placeholder="Post Content"
              className="h-full bg-transparent focus:outline-none m-3 text-white text-left"
              onBlur={(event) => {
                setContent(event.target.value);
              }}
              value={content}
            />
          </div>
          <button
            className="rounded-xl bg-gray-950 p-2 mt-0.5 text-gray-200 border-2 border-gray-500"
            type="submit"
            onClick={submitPost}>
            Post!
          </button>
        </div>
        <div className="relative">
          <SkillsDropdown
            className="absolute z-20 top-0 select-none"
            mySkills={skills}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
          />
          <div className="pt-16 flex flex-row flex-wrap items-start w-60">
            {selectedSkills.length !== 0 ? (
              skills.map((x) => {
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
                Add at least 3 skills for better searchability
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
