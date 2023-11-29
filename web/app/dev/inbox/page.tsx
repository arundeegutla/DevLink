'use client';
/**
 * Shows all existing conversations. Allows you to click on conversation and send messages?
 */

// External Components
import Loading from '@components/common/Loading';
import GroupChatBlock from '@components/common/GroupChatBlock';
import ChatMessage from '@components/common/ChatMessage';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Group, condensedGroup } from '@/hooks/models';
import { getPhotoURL } from '@/hooks/users';
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import Link from 'next/link';

// Icons
import { BsArrowUpRight, BsSendFill } from 'react-icons/bs';
import { Icons } from '@/models/icons';

// Auth
import { useFBUser } from '@context/FBUserContext';
import { useDLUser } from '@context/DLUserContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetGroup } from '@/hooks/groups';

export default function Inbox() {
  const router = useRouter();
  const { fbuser } = useFBUser();
  const { user } = useDLUser();

  // Initialize Firestore
  const firestore = getFirestore();

  // Make a array of the users groups based on user.groups
  const [groups, setGroups] = useState(user.groups);
  const [selectedGroup, setSelectedGroup] = useState(groups[0] ?? null);
  const [inputValue, setInputValue] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(true);
  const searchParams = useSearchParams();
  const [paramGroupId, setParamGroupId] = useState(searchParams.get('groupId'));
  if (paramGroupId) {
    const searchParamGroup = groups.find(
      (group) => group.id === paramGroupId
    ) as condensedGroup;
    setSelectedGroup(searchParamGroup ?? null);
    setParamGroupId(null);
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      const currValue = inputValue;
      setInputValue('');
      await addDoc(
        collection(firestore, 'Groups', selectedGroup?.id, 'messages'),
        {
          id: fbuser.uid,
          content: currValue,
          created: serverTimestamp(),
        }
      );
    }
  };

  const handleSelectGroup = (groupId: string) => {
    const newGroup = groups.find((group) => group.id === groupId);
    if (newGroup !== undefined) setSelectedGroup(newGroup);
    setMessages([]);
  };

  const {
    data: groupData,
    isLoading,
    isError,
  } = useGetGroup(fbuser, selectedGroup?.id) as {
    data: Group;
    isLoading: boolean;
    isError: boolean;
  }; // Make an array of all the messages in a group based on the group's messages subcollection and sort by timestamp
  const [messages, setMessages] = useState<
    { messageKey: string; id: string; content: string }[]
  >([]);
  useEffect(() => {
    if (selectedGroup === null) return;
    setLoadingMessages(true);

    const q = query(
      collection(
        doc(collection(firestore, 'Groups'), selectedGroup?.id),
        'messages'
      ),
      orderBy('created', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          messageKey: doc.id,
          id: doc.data().id as string,
          content: doc.data().content as string,
        }))
      );
      setLoadingMessages(false);
    });
    return unsubscribe;
  }, [selectedGroup, firestore]);

  // Display no chat messages if the users not in a project
  if (selectedGroup == null) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full h-full flex items-center justify-center bg-[#252525] rounded-3xl mr-4 border-2 border-[#747474]">
          <div className="flex flex-col items-center rounded-xl bg-[#1f1f1f] p-8">
            <h1 className="text-5xl font-medium text-center leading-tight mb-6">
              Join a Project to Start Messaging
            </h1>
            <Link href={'/dev/explore'}>
              <button className="px-4 py-2 border-gray-600 border-2 flex flex-row rounded-lg bg-gray-300 text-black hover:bg-black hover:text-white gap-3 transition-all duration-500 ease-in-out">
                <Icons.Explore className="text-2xl" />
                <div>Explore</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* Group chat block container */}
      <div className="w-1/4 h-full flex flex-col items-center bg-[#101010] border-[#747474] border-e-2 rounded-l-3xl border-2 border-gray-600">
        <div className="flex flex-col items-center justify-center text-4xl font-normal text-[#ffffff] h-20">
          Inbox
        </div>

        <hr className="border-t-2 w-full border-[#3b3b3b]" />
        <div className="flex flex-col w-full overflow-y-scroll">
          {groups.map((group) => {
            return (
              <GroupChatBlock
                key={group.id}
                groupId={group.id}
                groupColor={group.color}
                groupName={group.name}
                isSelected={group.id === selectedGroup?.id}
                changeGroup={handleSelectGroup}
              />
            );
          })}
        </div>
      </div>
      <div className="relative w-3/4 h-full flex flex-col bg-[#252525] mr-4 overflow-hidden rounded-r-3xl">
        <div
          className="absolute top-0 w-full h-20 flex items-center justify-between px-2 bg-opacity-20 backdrop-blur-2xl"
          style={{ backgroundColor: `${selectedGroup.color}33` }}>
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold ml-4">
              {selectedGroup.name}
            </h1>
          </div>
          <Link
            href={`/dev/project/${selectedGroup.id}`}
            target="_blank"
            className="cursor-pointer transition-all duration-300 ease-in-out rounded-full p-2 mr-2 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]">
            <BsArrowUpRight className="text-2xl" />
          </Link>
        </div>

        {/* Chat body container - contains all the messages in the chat */}
        {isLoading || loadingMessages ? (
          <Loading />
        ) : (
          <div className="w-full h-full flex flex-col-reverse overflow-y-scroll px-4 py-2 ">
            {messages.map((message, indx) => {
              const messageUser = groupData.members.find(
                (member) => member.id === message.id
              );
              return (
                <ChatMessage
                  key={message.messageKey}
                  messageContent={message.content}
                  isOwnMessage={message.id === fbuser?.uid}
                  user={messageUser ?? null}
                />
              );
            })}
            <div className="w-full  pt-24"></div>
          </div>
        )}

        {/* Chat messenger container - contains the text bar where users can send messages */}
        <div className="w-full h-20 flex items-center bg-[#1f1f1f] border-[#747474] border-t-2 p-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full h-full bg-[#252525] text-stone-200 outline-none rounded-xl mr-2 p-2 break-words"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
                e.preventDefault(); // Prevents the addition of a new line in the input on Enter
              }
            }}></input>
          <div
            className="transition-all duration-300 ease-in-out rounded-full p-3 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]"
            onClick={handleSendMessage}>
            <BsSendFill className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
