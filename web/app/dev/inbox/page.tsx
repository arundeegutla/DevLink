'use client';
/**
 * Shows all existing conversations. Allows you to click on conversation and send messages?
 */

// External Components
import Loading from '@components/common/Loading';
import GroupChatBlock from '@components/common/GroupChatBlock';
import ChatMessage from '@components/common/ChatMessage';

// Icons
import {
  BsArrowUpRight,
  BsSendFill,
 } from 'react-icons/bs';

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
          - projects header (FINISHED)
          - project search (maybe ?)
          - list of projects this user is apart of
            - sorted by recent messages
          - pfp's of each project (FINISHED)
          - most recent message from this chat (maybe ?) (FINISHED)
      */}
      <div className="w-1/4 h-full flex flex-col items-center bg-[#252525] p-2 border-[#747474] border-e-2 rounded-l-3xl">
        {/* TODO: Change inbox to have both inbox and messages - inbox will handle project requests and messages will handle messages */}
        <h1 className="text-xl font-semibold">Inbox</h1>
        <hr className="my-1 border-t-2 w-full border-[#3b3b3b]" />
        {/*
          TODO: Add timestamp for messages ? (idk if this is possible with firebase msging)
                Add notification thing (blue dot next to name of project)
                Shorten project name using ... to fit notification icon
        */}
        <div className="flex flex-col w-full overflow-y-scroll">
          <GroupChatBlock
            groupImage={"https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781647228231/minecraft-steve-block-stationery-set-9781647228231_hr.jpg"}
            groupName={"The Crafters"}
            lastMessage={"mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"}
            isSelected={true}
          />
          <GroupChatBlock
            groupImage={"https://media.licdn.com/dms/image/D4E03AQH5CpaCJCgo1A/profile-displayphoto-shrink_800_800/0/1694814673983?e=2147483647&v=beta&t=K1MezuWNQkHxSqXzqjWwQAf4RrzOLJ0vKc5S1Ewi60A"}
            groupName={"Rahul Mohan Fanpage"}
            lastMessage={"you can't actually access thislollaosdloasldoasldoalsodlasodlasodlaosl ok then what will we do next"}
            isSelected={false}
          />
          <GroupChatBlock
            groupImage={"https://media.licdn.com/dms/image/D4E03AQH5CpaCJCgo1A/profile-displayphoto-shrink_800_800/0/1694814673983?e=2147483647&v=beta&t=K1MezuWNQkHxSqXzqjWwQAf4RrzOLJ0vKc5S1Ewi60A"}
            groupName={"Rahul Mohan Fanpage"}
            lastMessage={"you can't actually access thislollaosdloasldoasldoalsodlasodlasodlaosl ok then what will we do next"}
            isSelected={false}
          />
          <GroupChatBlock
            groupImage={"https://media.licdn.com/dms/image/D4E03AQH5CpaCJCgo1A/profile-displayphoto-shrink_800_800/0/1694814673983?e=2147483647&v=beta&t=K1MezuWNQkHxSqXzqjWwQAf4RrzOLJ0vKc5S1Ewi60A"}
            groupName={"Rahul Mohan Fanpage"}
            lastMessage={"you can't actually access thislollaosdloasldoasldoalsodlasodlasodlaosl ok then what will we do next"}
            isSelected={false}
          />
          <GroupChatBlock
            groupImage={"https://media.licdn.com/dms/image/D4E03AQH5CpaCJCgo1A/profile-displayphoto-shrink_800_800/0/1694814673983?e=2147483647&v=beta&t=K1MezuWNQkHxSqXzqjWwQAf4RrzOLJ0vKc5S1Ewi60A"}
            groupName={"Rahul Mohan Fanpage"}
            lastMessage={"you can't actually access thislollaosdloasldoasldoalsodlasodlasodlaosl ok then what will we do next"}
            isSelected={false}
          />
          <GroupChatBlock
            groupImage={"https://media.licdn.com/dms/image/D4E03AQH5CpaCJCgo1A/profile-displayphoto-shrink_800_800/0/1694814673983?e=2147483647&v=beta&t=K1MezuWNQkHxSqXzqjWwQAf4RrzOLJ0vKc5S1Ewi60A"}
            groupName={"Rahul Mohan Fanpage"}
            lastMessage={"you can't actually access thislollaosdloasldoasldoalsodlasodlasodlaosl ok then what will we do next"}
            isSelected={false}
          />
          <GroupChatBlock
            groupImage={"https://media.licdn.com/dms/image/D4E03AQH5CpaCJCgo1A/profile-displayphoto-shrink_800_800/0/1694814673983?e=2147483647&v=beta&t=K1MezuWNQkHxSqXzqjWwQAf4RrzOLJ0vKc5S1Ewi60A"}
            groupName={"Rahul Mohan Fanpage"}
            lastMessage={"you can't actually access thislollaosdloasldoasldoalsodlasodlasodlaosl ok then what will we do next"}
            isSelected={false}
          />
          <GroupChatBlock
            groupImage={"https://media.licdn.com/dms/image/D4E03AQH5CpaCJCgo1A/profile-displayphoto-shrink_800_800/0/1694814673983?e=2147483647&v=beta&t=K1MezuWNQkHxSqXzqjWwQAf4RrzOLJ0vKc5S1Ewi60A"}
            groupName={"Rahul Mohan Fanpage"}
            lastMessage={"you can't actually access thislollaosdloasldoasldoalsodlasodlasodlaosl ok then what will we do next"}
            isSelected={false}
          />
          <GroupChatBlock
            groupImage={"https://media.licdn.com/dms/image/D4E03AQH5CpaCJCgo1A/profile-displayphoto-shrink_800_800/0/1694814673983?e=2147483647&v=beta&t=K1MezuWNQkHxSqXzqjWwQAf4RrzOLJ0vKc5S1Ewi60A"}
            groupName={"Rahul Mohan Fanpage"}
            lastMessage={"you can't actually access thislollaosdloasldoasldoalsodlasodlasodlaosl ok then what will we do next"}
            isSelected={false}
          />
          <GroupChatBlock
            groupImage={"https://media.licdn.com/dms/image/D4E03AQH5CpaCJCgo1A/profile-displayphoto-shrink_800_800/0/1694814673983?e=2147483647&v=beta&t=K1MezuWNQkHxSqXzqjWwQAf4RrzOLJ0vKc5S1Ewi60A"}
            groupName={"Rahul Mohan Fanpage"}
            lastMessage={"you can't actually access thislollaosdloasldoasldoalsodlasodlasodlaosl ok then what will we do next"}
            isSelected={false}
          />
        </div>
      </div>
      {/*
        Message section with:
          - name of project (FINISHED)
          - message history (FINISHED)
          - pfp's of senders (FINISHED)
          - message bar (FINISHED)
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
        {/* Chat body container - contains all the messages in the chat */}
        <div className="w-full h-full flex flex-col overflow-y-scroll px-4 py-2">
          <ChatMessage messageContent={"yo what's up"} isSelfMessage={false} user={user} />
          <ChatMessage messageContent={"this is a pretty long message that should break onto the next line if it actually works properly !!! :))))))0"} isSelfMessage={true} user={user} />
          <ChatMessage messageContent={"i still have to add profile pictures to the left of this along with the name of who sent the message. ill do that shi later"} isSelfMessage={true} user={user} />
          <ChatMessage messageContent={"i still have to add profile pictures to the left of this along with the name of who sent the message. ill do that shi later"} isSelfMessage={false} user={user} />
          <ChatMessage messageContent={"i still have to add profile pictures to the left of this along with the name of who sent the message. ill do that shi later"} isSelfMessage={true} user={user} />
          <ChatMessage messageContent={"i still have to add profile pictures to the left of this along with the name of who sent the message. ill do that shi later"} isSelfMessage={false} user={user} />
          <ChatMessage messageContent={"i still have to add profile pictures to the left of this along with the name of who sent the message. ill do that shi later"} isSelfMessage={true} user={user} />
          <ChatMessage messageContent={"i still have to add profile pictures to the left of this along with the name of who sent the message. ill do that shi later"} isSelfMessage={true} user={user} />
        </div>
        {/* Chat messenger container - contains the text bar where users can send messages */}
        <div className="w-full h-20 flex items-center bg-[#1f1f1f] border-[#747474] border-t-2 p-3">
          <input type="text" placeholder="Type a message..." className="w-full h-full bg-[#252525] text-stone-200 outline-none rounded-xl mr-2 p-2"></input>
          <div className="transition-all duration-300 ease-in-out rounded-full p-3 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]">
            <BsSendFill className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
