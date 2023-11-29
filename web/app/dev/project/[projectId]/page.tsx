'use client';
/**
 * Shows a project's details. Only accesible if you are in the project. Otherwise,
 * even if it a valid project ID, it will show 404 error.
 */

import { IoMdPersonAdd } from 'react-icons/io';
import { RiUserAddFill } from 'react-icons/ri';
import { getGroup, handleRequest, joinGroup } from '@/hooks/groups';
import Loading from '@components/common/Loading';
import { useFBUser } from '@context/FBUserContext';
import { Group, User, condensedGroup, condensedUser } from '@/hooks/models';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Error from '@components/common/Error';
import { defaultImageURL, getPhotoURL, getUser } from '@/hooks/users';
import { Icons, SkillType, skillMap } from '@/models/icons';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  ChartData,
  Tooltip,
  Legend,
  LegendItem,
} from 'chart.js';
import Image from 'next/image';
import React from 'react';
import PostCard from '@components/common/PostCard';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';
import { twMerge } from 'tailwind-merge';
import { LuUserPlus } from 'react-icons/lu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDLUser } from '@context/DLUserContext';

export default function ProjectView({
  params,
}: {
  params: { projectId: string };
}) {
  const router = useRouter();
  const { fbuser } = useFBUser();

  const projectId = params.projectId;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [project, setProject] = useState<Group>();
  const [members, setMembers] = useState<User[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isAlreadyUser, setIsAlreadyUser] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroup = async () => {
      const project = await getGroup(fbuser, projectId);
      if (!project) setError(true);
      else {
        setProject(project);
        setIsOwner(project.owner === fbuser.uid);
        setIsAlreadyUser(
          project.members.some((member) => member.id === fbuser.uid)
        );
      }
    };
    fetchGroup();
  }, [fbuser, projectId]);

  useEffect(() => {
    if (project) {
      const fetchMembers = async () => {
        const members = await Promise.all(
          project.members.map(async (member) => {
            return await getUser(fbuser, member.id);
          })
        );
        setMembers(members.filter((member) => member !== undefined) as User[]);
        setLoading(false);
      };
      fetchMembers();
    }
  }, [fbuser, project]);

  const handleNewPostClick = () => {
    router.push(`/dev/project/edit_post/${projectId}`);
  };

  if (loading) return <Loading />;
  else if (error || !project) return <Error message={`Invalid Project URL`} />;

  return (
    <div className="relative w-full min-w-[1076px] mr-4 flex min-h-full flex-col pt-5 pl-3 pr-7 overflow-hidden">
      {/* Header */}
      <div className="relative flex flex-row items-center p-2 pl-7 rounded-xl bg-black/[60%] border-2 border-gray-500 justify-between overflow-hidden">
        <div className="text-4xl font-normal text-[#ffffff] items-end my-3">
          <div className="my-3">{project.name}</div>
          <div className="text-2xl text-gray-400 font-light">
            {project.description}
          </div>
        </div>
        <div className="flex flex-row items-center">
          {!isAlreadyUser && (
            <RequestJoinButton project={project} projectId={projectId} />
          )}
          <div className="flex flex-col items-center w-32 border-r-2 border-gray-500">
            <div className="text-4xl font-bold">{project.members.length}</div>
            <div className="text-gray-400">
              Member{project.members.length != 1 && 's'}
            </div>
          </div>
          <div className="flex flex-col items-center w-28 ml-2">
            <div className="text-4xl font-bold">{project.posts.length}</div>
            <div className="text-gray-400">
              Post{project.posts.length != 1 && 's'}
            </div>
          </div>
        </div>
        <div
          className="absolute -top-6 -left-6 w-36 h-36 opacity-20 filter blur-[70px] rounded-full"
          style={{ backgroundColor: `${project.color}` }}
        />
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <div className="relative rounded-xl bg-black/[60%] border-2 border-gray-500 w-80 h-fit min-h-max p-4 mt-5 overflow-hidden">
            <div className="text-2xl font-light text-gray-200">Skills</div>
            <div
              className="absolute -top-6 -left-6 w-36 h-36 opacity-20 filter blur-[70px] rounded-full"
              style={{ backgroundColor: `${project.color}` }}
            />
            <PieChart members={members} />
          </div>

          <UsersList
            project={project}
            isOwner={isOwner}
            projectId={projectId}
          />
        </div>

        <div className="rounded-xl min-w-[700px] w-fit h-fit min-h-max p-4 mt-3">
          <div className="text-2xl font-light text-gray-200">Posts</div>
          <div className="mt-2 flex flex-row flex-wrap items-stretch transition-all duration-500 ease-in-out">
            {project.posts.length > 0
              ? project.posts.map((x, indx) => {
                  if (!x) return <div key={'null'}></div>;
                  return <PostCard key={x.id} post={x} color={project.color} />;
                })
              : ''}
            {isOwner ? (
              project.posts.length > 0 ? (
                <Tilt
                  tiltReverse={true}
                  glareMaxOpacity={0}
                  transitionSpeed={5000}
                  className={`relative rounded-lg mr-4 mt-4 bg-[#22222253] cursor-pointer overflow-hidden w-80 h-44 hover:bg-[#2222229e] flex items-center justify-center border-2 border-gray-500`}>
                  <div
                    onClick={handleNewPostClick}
                    className="w-full h-full relative z-10 flex flex-col items-center justify-center p-5 cursor-pointer rounded-xl">
                    <Icons.Plus className="text-6xl text-gray-300" />
                    <h1 className="mt-2">Add Post</h1>
                  </div>
                </Tilt>
              ) : (
                <div className="p-10 rounded-xl mt-2 max-w-lg bg-black/[60%] border-2 border-gray-500">
                  <h1 className="text-2xl text-gray-300">No posts yet 👋</h1>
                  <p className="text-gray-400 mt-3">
                    Share your project details and invite collaborators to join
                    your journey.
                  </p>
                  <div className="flex flex-row gap-4 mt-4">
                    <button
                      onClick={handleNewPostClick}
                      className="px-4 py-2 border-gray-600 border-2 flex flex-row rounded-lg bg-gray-300 text-black hover:bg-black hover:text-white gap-3 transition-all duration-500 ease-in-out">
                      <Icons.Plus className="text-2xl" />
                      <div>Add Post</div>
                    </button>
                  </div>
                </div>
              )
            ) : !(project.posts.length > 0) ? (
              <div className="text-lg text-gray-400">No Posts Found</div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div
        className="fixed -top-6 -right-6 w-36 h-36 opacity-20 filter blur-[70px] rounded-full"
        style={{ backgroundColor: `${project.color}` }}
      />
    </div>
  );
}

const PieChart = ({ members }: { members: User[] }) => {
  let skillCountsMap: Map<string, number> = new Map();
  members.forEach((member) => {
    member.skills.forEach((skill: string) => {
      skillCountsMap.set(skill, (skillCountsMap.get(skill) || 0) + 1);
    });
  });

  const skillCountsArray = Array.from(skillCountsMap.entries());
  const sortedSkillCountsArray = skillCountsArray.sort((a, b) => b[1] - a[1]);

  const labels = sortedSkillCountsArray.map((skill) => skill[0]);
  const data = sortedSkillCountsArray.map((skill) => skill[1]);

  const backgroundColors = labels.map((skill) => {
    const skillObject = skillMap[skill];
    return skillObject ? `${skillObject.color}eb` : '#CCCCCC33';
  });

  const hoverBackgroundColors = labels.map((skill) => {
    const skillObject = skillMap[skill];
    return skillObject ? `${skillObject.color}33` : '#CCCCCC33';
  });

  const borderColor = labels.map((skill) => {
    return '#000000';
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
        borderColor: borderColor,
      },
    ],
    hoverOffset: 4,
  };
  Chart.register(ArcElement, Tooltip, Legend);

  return (
    <div className="w-full">
      {labels.length > 0 ? (
        <Doughnut
          style={{ zIndex: 50, position: 'relative' }}
          className="-my-11 z-50"
          data={chartData}
          options={{
            plugins: {
              legend: {
                position: 'right',
                align: 'center',
                labels: {
                  color: 'white',
                  usePointStyle: true,
                  generateLabels: (chart): LegendItem[] => {
                    const data = chart.data;

                    if (
                      data.labels &&
                      data.labels.length > 0 &&
                      data.datasets[0].hoverBackgroundColor
                    ) {
                      // Show only the first three labels
                      let len = 5;
                      const slicedLabels: string[] = data.labels.slice(
                        0,
                        len
                      ) as string[];
                      const slicedColors = (
                        data.datasets[0].backgroundColor as string[]
                      ).slice(0, len);

                      return slicedLabels.map((label: string, index) => ({
                        text: label,
                        fontColor: 'white',
                        hidden: false,
                        lineWidth: 1,
                        fillStyle:
                          (data.datasets[0].backgroundColor as string[])[
                            index
                          ] ?? '#CCCCCC33',
                      }));
                    }

                    return [];
                  },
                },
              },
            },
            animation: {
              duration: 1000,
            },
          }}
        />
      ) : (
        <div className="text-gray-400 text-center">No data</div>
      )}
    </div>
  );
};

const UsersList = ({
  project,
  isOwner,
  projectId,
}: {
  project: Group;
  isOwner: boolean;
  projectId: string;
}) => {
  return (
    <div className="relative flex flex-col rounded-xl bg-black/[60%] border-2 border-gray-500 w-80 h-fit mt-5 overflow-hidden">
      <div
        className="absolute -top-6 -left-6 w-36 h-36 opacity-20 filter blur-[70px] rounded-full"
        style={{ backgroundColor: `${project.color}` }}
      />
      {!isOwner ? (
        <div>
          <div className="text-2xl font-light text-gray-200 p-4 border-b-2 border-gray-500 bg-gray-800/[90%]">
            Users
          </div>
          <div className="animated animatedFadeInUp fadeInUp flex flex-col h-fit">
            {project.members.map((member) => (
              <UserBox
                key={member.id}
                user={member}
                isInQueue={false}
                project={project}
                projectId={projectId}
              />
            ))}
          </div>
        </div>
      ) : (
        <TabsComponent
          items={[
            {
              title: 'Users',
              content: (
                <div className="flex flex-col min-h-[200px]">
                  {project.members.map((member) => (
                    <UserBox
                      key={member.id}
                      user={member}
                      isInQueue={false}
                      project={project}
                      projectId={projectId}
                    />
                  ))}
                </div>
              ),
            },
            {
              title: 'Requests',
              content: (
                <div className="flex flex-col min-h-[200px]">
                  {project.userQueue.length ? (
                    project.userQueue.map((member) => (
                      <UserBox
                        key={member.id}
                        user={member}
                        isInQueue={true}
                        project={project}
                        projectId={projectId}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col w-full h-full items-center justify-center text-gray-300 mt-3">
                      No requests
                    </div>
                  )}
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

const TabsComponent = ({
  items,
}: {
  items: { title: string; content: React.ReactNode }[];
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="flex flex-col w-full items-stretch justify-center rounded-full">
      <div className="flex flex-row w-full items-center justify-center px-8 pt-2 pb-2 border-b-2 border-gray-500 bg-gray-800/[80%] z-10">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(index)}
            className={twMerge(
              `hover:cursor-pointer flex flex-col justify-center items-center text-xl font-light text-gray-200 py-2 flex-1`,
              `${
                selectedTab === index
                  ? 'bg-white text-black rounded-full hover:text-black shadow-2xl shadow-black font-medium'
                  : 'text-gray-200 hover:text-gray-400 text-lg'
              }`
            )}>
            {item.title}
          </button>
        ))}
      </div>

      {items.map((item, index) => (
        <div
          key={item.title}
          className={`${
            selectedTab === index
              ? 'animated animatedFadeInUp fadeInUp'
              : 'hidden'
          }`}>
          {item.content}
        </div>
      ))}
    </div>
  );
};
const UserBox = ({
  user,
  isInQueue,
  project,
  projectId,
}: {
  user: condensedUser;
  isInQueue: boolean;
  project: Group;
  projectId: string;
}) => {
  const { fbuser } = useFBUser();
  const [imageURL, setImageURL] = useState<string>(defaultImageURL);
  const [hovering, setHovering] = useState<boolean>(false);

  const getImage = async () => {
    const url = await getPhotoURL(user.id);
    setImageURL(url);
  };
  getImage();

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="animated animatedFadeInUp fadeInUp transition-all duration-500 ease-in-out relative flex flex-row items-center gap-2 bg-gray-500/[10%] px-2 border-b-2 border-gray-500 cursor-pointer hover:bg-gray-500/[30%] py-2">
      <Link
        target="_blank"
        href={`/dev/profile/${user.id}`}
        className="flex flex-row items-center gap-2">
        <Image
          width={0}
          height={0}
          src={imageURL}
          className="h-10 w-10 border border-[#4e4e4e] rounded-full"
          alt="Profile Picture"
        />
        <div className="text-gray-200">
          {user.firstName + ' ' + user.lastName}
        </div>

        {!hovering && !isInQueue && user.id === project.owner && (
          <div className="absolute right-4 text-gray-400 my-auto">owner</div>
        )}
        {!hovering &&
          !isInQueue &&
          !(user.id === project.owner) &&
          user.id === fbuser.uid && (
            <div className="absolute right-4 text-gray-400 my-auto">me</div>
          )}
        {hovering && !isInQueue && (
          <div className="absolute right-2 my-auto rounded-full flex flex-row bg-gray-200 px-3 py-1 gap-2 items-center text-gray-900 cursor-pointer">
            <Icons.ArrowUpRight />
          </div>
        )}
      </Link>
      {isInQueue && (
        <RequestActions
          userId={user.id}
          project={project}
          projectId={projectId}
        />
      )}
    </div>
  );
};

const RequestActions = ({
  project,
  projectId,
  userId,
}: {
  project: Group;
  projectId: string;
  userId: string;
}) => {
  const { fbuser } = useFBUser();
  const { user, refetch } = useDLUser();
  const [clickedSomething, setClickedSomething] = useState<boolean>(false);
  const notifySucess = (message: string) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    toast.onChange((evnt) => {
      evnt.status === 'removed' && refetch;
    });
  };

  const notifyReject = (message: string) => {
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    toast.onChange((evnt) => {
      evnt.status === 'removed' && refetch;
    });
  };

  const handleJoinClick = async () => {
    setClickedSomething(true);
    await handleRequest(fbuser, {
      groupId: projectId,
      requestedUserId: userId,
      accept: true,
    });
    notifySucess('Request Accepted');
  };
  const handleDeclineClick = async () => {
    setClickedSomething(true);
    await handleRequest(fbuser, {
      groupId: projectId,
      requestedUserId: userId,
      accept: false,
    });
    notifyReject('Request Declined');
  };

  return (
    <>
      <ToastContainer />
      {!clickedSomething && (
        <div className="absolute right-2 my-auto rounded-full flex flex-row px-3 py-1 gap-2 items-center text-gray-900 cursor-pointer">
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleJoinClick();
            }}
            className="z-50 transition-all duration-500 ease-in-out px-2 bg-green-500 py-1 rounded-md hover:px-3 hover:bg-green-500/[90%]">
            <IoMdPersonAdd className="text-xl text-green-900" />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleDeclineClick();
            }}
            className="z-50 transition-all duration-500 ease-in-out px-2 bg-red-500 py-1 rounded-md hover:px-3 hover:bg-red-500/[90%]">
            <Icons.Danger className="text-xl text-red-900" />
          </button>
        </div>
      )}
    </>
  );
};

const RequestJoinButton = ({
  project,
  projectId,
}: {
  project: Group;
  projectId: string;
}) => {
  const { fbuser } = useFBUser();

  const notify = (message: string) => {
    console.log('Notifying');
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const [sendRequestStatus, setSendRequestStatus] = useState<boolean>(false);
  const handleJoinClick = async () => {
    if (sendRequestStatus) return;
    console.log('Requesting to join: ' + (await joinGroup(fbuser, projectId)));

    setSendRequestStatus(true);
    notify('Request Sent');
  };

  return (
    <>
      <button
        onClick={handleJoinClick}
        className="mr-3 rounded-lg border-2 border-gray-300"
        style={{ backgroundColor: project.color }}>
        <div
          className={`bg-black/[40%] flex flex-row p-2 px-3 rounded-lg gap-2 items-center hover:bg-black/[20%] ${
            !sendRequestStatus ? 'cursor-pointer' : 'cursor-default'
          }`}>
          {sendRequestStatus ? (
            <Icons.Check className="text-2xl text-gray-100" />
          ) : (
            <LuUserPlus className="text-2xl text-gray-100" />
          )}
          <div className="text-gray-100 text-lg">
            {sendRequestStatus ? 'Requested' : 'Join'}
          </div>
        </div>
      </button>
      <ToastContainer />
    </>
  );
};
