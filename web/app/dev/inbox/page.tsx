'use client';
/**
 * Shows all existing conversations. Allows you to click on conversation and send messages?
 */

// External Components
import Loading from '@components/common/Loading';
import GroupChatBlock from '@components/common/GroupChatBlock';

// Icons
import { BsArrowUpRight } from 'react-icons/bs';

// Auth
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Inbox() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (user && !user.emailVerified) {
    router.push('/dev/verify');
    return <Loading />;
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    router.push('/');
    console.log('no user signed in home');
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-row items-center justify-center p-4">
      {/*
        Chat selection section with:
          - projects header
          - project search (maybe ?)
          - list of projects this user is apart of
            - sorted by recent messages
          - pfp's of each project
          - most recent message from this chat (maybe ?)
      */}
      <div className="w-1/4 h-full flex flex-col items-center bg-[#252525] p-2 border-[#747474] border-e-2 rounded-l-3xl">
        <h1 className="text-xl font-semibold">Inbox</h1>
        <hr className="my-1 border-t-2 w-full border-[#3b3b3b]" />
        {/* TODO: Add timestamp for messages ? (idk if this is possible with firebase msging) */}
        <div className="flex flex-col w-full">
          <GroupChatBlock
            groupImage={"https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781647228231/minecraft-steve-block-stationery-set-9781647228231_hr.jpg"}
            groupName={"The Crafters"}
            lastMessage={"mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"}
            isSelected={true}
          />
          <GroupChatBlock
            groupImage={"data:image/jpeg;base64,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"}
            groupName={"Rahul Mohan Fanpage"}
            lastMessage={"you can't actually access thislollaosdloasldoasldoalsodlasodlasodlaosl ok then what will we do next"}
            isSelected={false}
          />
        </div>
      </div>
      {/*
        Message section with:
          - name of project
          - message history
          - pfp's of senders
          - message bar
      */}
      {/* TODO: componentize this so it can be swapped out based on which group is being viewed */}
      <div className="w-3/4 h-full flex flex-col bg-[#252525] mr-4 overflow-hidden rounded-r-3xl">
        {/* Chat heading container */}
        <div className="w-full h-20 flex items-center justify-between bg-[#1f1f1f] px-2">
          {/* Image + chat name */}
          <div className="flex items-center">
            <img
              src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781647228231/minecraft-steve-block-stationery-set-9781647228231_hr.jpg"
              className="w-12 h-12 rounded-full ml-2 mr-4"
              alt="Group Chat Image">
            </img>
            <h1 className="text-xl font-semibold mr-2">The Crafters</h1>
          </div>
          {/* Link to project page */}
          <div className="transition-all duration-300 ease-in-out rounded-full p-2 mr-2 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]">
            <BsArrowUpRight className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
