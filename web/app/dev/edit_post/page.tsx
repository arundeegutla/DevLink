'use client';
/**
 * Page that will show up when user creates new post or edit an existing post.
 * When editing, the editor will be pre-populated with the existing post's markdown.
 */

import { skills, SkillType, Icons } from '@models/icons';
import { useFBUser } from '@context/FBUserContext';
import { useState } from 'react';

import SkillsDropdown from './SkillsDropdown';
import Skill from './Skill';
import { useCreatePost, useEditPost, useGetPost } from '@/hooks/posts';
import Loading from '@components/common/Loading';
import { useSearchParams } from 'next/navigation';

export default function EditPostView() {
  const params = useSearchParams();
  const { fbuser } = useFBUser();

  const groupName = params.get("groupName") || "";

  const postId = params.get("postId") || "";
  const groupId = params.get("groupId") || "";
  const isEditing = !!postId;

  const { data, isPending } = useGetPost(fbuser, postId);

  const createMutation = useCreatePost();
  const editMutation = useEditPost();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillClick = (selectedSkill: SkillType) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== selectedSkill.name)
    );
  };

  const submitPost = async () => {
    if (title.length === 0 || body.length === 0) return;

    let res = false;
    if (isEditing) {
      res = await editMutation.mutateAsync({
        user: fbuser,
        post: {
          postId: postId,
          title: title,
          body: body,
          skillsWanted: selectedSkills
        }
      });
    }
    else {
      res = await createMutation.mutateAsync({
        user: fbuser,
        post: {
          groupId: groupId,
          title: title,
          body: body,
          skillsWanted: selectedSkills
        }
      });
    }
    
  }

  if (isEditing && isPending) {
    return <Loading/>
  }
  else if (isLoading && isEditing && data) {
    setTitle(data.title);
    setBody(data.body);
    setSelectedSkills(data.skillsWanted);
    setLoading(false);
  }

  return (
    <div className="w-full h-full pl-3 flex flex-col justify-center py-5">
      <div className="my-5 text-4xl font-normal text-[#ffffff]">{isEditing ? "Editing" : "Creating"} post for: {groupName}</div>
      <div className="w-full h-full flex flex-row justify-center gap-3 mt-5 items-start">
        <div className="flex flex-col w-6/12 h-5/6 gap-3 items-center">
          <div className="flex flex-col rounded-xl bg-gray-700 text-black w-full h-15">
            <input
              placeholder="Title"
              className="h-full bg-transparent focus:outline-none m-3 text-white text-left"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              value={title}
            />
          </div>
          <div className="flex flex-col rounded-xl bg-gray-700 text-black w-full h-full">
            <textarea
              placeholder="Post Content"
              className="h-full bg-transparent focus:outline-none m-3 text-white text-left"
              onChange={(event) => {
                setBody(event.target.value);
              }}
              value={body}
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
