// Icons
import { FaUser } from 'react-icons/fa';
import { User } from 'firebase/auth';
import Image from 'next/image';

export interface ChatMessage {
  messageContent: string;
  isOwnMessage: boolean;
  user: User | undefined;
}

export default function ChatMessage({
  messageContent,
  isOwnMessage,
  user,
}: ChatMessage) {
  const getProfilePic = () => {
    if (!user) {
      return (
        <FaUser className="h-10 w-10 border border-[#4e4e4e] rounded-full" />
      );
    }
    return (
      <Image
        width={0}
        height={0}
        src={
          isOwnMessage
            ? user.photoURL ??
              'https://s3-symbol-logo.tradingview.com/alphabet--600.png'
            : // TODO: Get other user's profile picture - temporary placeholder
              'https://s3-symbol-logo.tradingview.com/alphabet--600.png'
        }
        className="h-10 w-10 border border-[#4e4e4e] rounded-full"
        alt="Profile Picture"
      />
    );
  };

  return (
    <div
      className={`w-auto max-w-sm h-full flex-col ${
        isOwnMessage ? 'self-end' : 'self-start'
      } mt-2`}>
      <div className="flex">
        {!isOwnMessage && (
          <div className="mr-2 flex-shrink-0 self-end">{getProfilePic()}</div>
        )}
        <h1
          className={`w-auto h-auto break-words ${
            isOwnMessage ? 'bg-cyan-600' : 'bg-amber-500'
          } rounded-xl p-2 font-medium`}>
          {messageContent}
        </h1>
      </div>
      {!isOwnMessage && (
        <h1 className="font-light text-stone-200 mt-1">Sender A</h1>
      )}
    </div>
  );
}
