'use client';
/**
 * Page that will show up when user creates new post or edit an existing post.
 * When editing, the editor will be pre-populated with the existing post's markdown.
 */

import { skills, SkillType, Icons } from '@models/icons';
import { useFBUser } from '@context/FBUserContext';
import { useEffect, useState } from 'react';

import SkillsDropdown from './SkillsDropdown';
import Skill from './Skill';
import {
  createPost,
  useCreatePost,
  useEditPost,
  useGetPost,
} from '@/hooks/posts';
import Loading from '@components/common/Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import { getGroup } from '@/hooks/groups';
import { Group } from '@/hooks/models';
import Error from '@components/common/Error';
import { set } from 'firebase/database';
import Alert from '@components/common/Alert';

export default function EditPostView() {
  const router = useRouter();
  const params = useSearchParams();
  const { fbuser } = useFBUser();

  const groupName = params.get('groupName') || '';

  const postId = params.get('postId') || '';
  const groupId = params.get('groupId') || '';
  const isEditing = !!postId;

  const { data, isPending } = useGetPost(fbuser, postId);
  // const editMutation = useEditPost();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [project, setProject] = useState<Group>();
  const [alert, setAlert] = useState<string>('');

  const handleSkillClick = (selectedSkill: SkillType) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== selectedSkill.name)
    );
  };

  useEffect(() => {
    const fetchGroup = async () => {
      const project = await getGroup(fbuser, groupId);
      if (!project) setError(true);
      else {
        setProject(project);
        if (project.owner !== fbuser.uid) {
          setError(true);
        }
      }
      setLoading(false);
    };
    fetchGroup();
  }, [fbuser, groupId]);

  if (isLoading) return <Loading />;
  else if (error || !project) return <Error message={`Invalid Project URL`} />;
  if (isEditing && isPending) {
    return <Loading />;
  } else if (isLoading && isEditing && data) {
    setTitle(data.title);
    setBody(data.body);
    setSelectedSkills(data.skillsWanted);
    setLoading(false);
  }
  const submitPost = async () => {
    if (title.length === 0 || body.length === 0 || selectedSkills.length < 3) {
      setAlert('Please fill out all fields and select at least 3 skills');
      return;
    }

    let res = false;
    if (isEditing) {
      // res = await editMutation.mutateAsync({
      //   user: fbuser,
      //   post: {
      //     postId: postId,
      //     title: title,
      //     body: body,
      //     skillsWanted: selectedSkills,
      //   },
      // });
    } else {
      res = await createPost(fbuser, {
        groupId: groupId,
        title: title,
        body: body,
        skillsWanted: selectedSkills,
      });
      console.log(res ? 'success' : 'fail');
    }

    if (res) {
      router.push(`/dev/project/${groupId}`);
    }
  };

  return (
    <div className="relative w-full h-full pl-3 flex flex-col justify-center py-5 pr-4">
      <div className="relative flex flex-row items-center p-2 pl-7 rounded-xl bg-black/[60%] border-2 border-gray-500 justify-between overflow-hidden">
        <div className="text-4xl font-normal text-[#ffffff] items-end my-3">
          <div className="my-3">{groupName}</div>
        </div>
        <div
          className="absolute -top-6 -left-6 w-36 h-36 opacity-20 filter blur-[70px] rounded-full"
          style={{ backgroundColor: `${project.color}` }}
        />
      </div>

      <div className="w-full h-full flex flex-row justify-center gap-3 mt-5 items-start">
        <div className="flex flex-col w-6/12 h-5/6 gap-3 items-start">
          <div className="my-5 text-4xl font-normal text-[#ffffff]">
            {isEditing ? 'Edit Post' : 'Create'} post
          </div>
          <div className="flex flex-col rounded-xl bg-gray-600 text-black w-full h-15">
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
          {alert && <Alert alertType="danger">{alert}</Alert>}
          <button
            onClick={submitPost}
            type="submit"
            className="px-4 py-2 border-gray-600 border-2 flex flex-row rounded-lg bg-gray-300 text-black hover:bg-black hover:text-white gap-3 transition-all duration-500 ease-in-out">
            <Icons.Plus className="text-2xl" />
            <div>Post</div>
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
