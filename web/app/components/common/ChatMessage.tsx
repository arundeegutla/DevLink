// Icons
import { condensedUser } from '@/hooks/models';
import { getPhotoURL } from '@/hooks/users';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export interface ChatMessage {
  messageContent: string;
  isOwnMessage: boolean;
  user: condensedUser | null;
}

export default function ChatMessage({
  messageContent,
  isOwnMessage,
  user,
}: ChatMessage) {
  const [photoURL, setPhotoURL] = useState('');

  const getProfilePic = () => {
    if (!isOwnMessage) {
      // user is condensedUser, arun please get pfp from id :)
      return (
        <Image
          width={0}
          height={0}
          src={photoURL}
          className="h-10 w-10 border border-[#4e4e4e] rounded-full"
          alt="Profile Picture"
        />
      );
    }
  };

  useEffect(() => {
    if (user) {
      getPhotoURL(user.id).then((url) => setPhotoURL(url));
    }
  });

  return (
    <div
      className={`w-auto max-w-sm flex-col ${
        isOwnMessage ? 'self-end' : 'self-start'
      } mt-5`}>
      <div className="flex">
        {!isOwnMessage && (
          <div className="mr-2 flex-shrink-0 self-end">{getProfilePic()}</div>
        )}
        <h1
          className={`w-auto h-auto min-w-0 break-words ${
            isOwnMessage ? 'bg-[#218aff]' : 'bg-[#4c4c4d]'
          } rounded-xl p-2 font-medium`}>
          {messageContent}
        </h1>
      </div>
      {!isOwnMessage && (
        <h1 className="font-light text-stone-200 mt-1">
          {user ? user.firstName + ' ' + user.lastName : 'Unknown'}
        </h1>
      )}
    </div>
  );
}
