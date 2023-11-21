// Icons
import { FaUser } from 'react-icons/fa';

export interface ChatMessage {
  messageContent: string;
  isSelfMessage: boolean;
  user: any;
}

export default function ChatMessage({
  messageContent,
  isSelfMessage,
  user,
}: ChatMessage) {

  const getProfilePic = () => {
    if (!user) {
      return (
        <FaUser className="h-10 w-10 border border-[#4e4e4e] rounded-full" />
      )
    }
    return (
      <img
        src={
          isSelfMessage ?
          (user.photoURL ??
          'https://s3-symbol-logo.tradingview.com/alphabet--600.png') :
           // TODO: Get other user's profile picture - temporary placeholder
          'https://s3-symbol-logo.tradingview.com/alphabet--600.png'
        }
        className="h-10 w-10 border border-[#4e4e4e] rounded-full"
        alt="Profile Picture"
      />
    )
  }

  return (
    <div className={`w-full max-w-sm h-full flex items-center ${isSelfMessage ? "self-end" : "self-start"} mt-2`}>
      { !isSelfMessage && <div className="mr-2 flex-shrink-0">{getProfilePic()}</div> }
      <div className={`w-auto h-auto break-words ${isSelfMessage ? "bg-cyan-600" : "bg-amber-500"} rounded-xl p-2`}>
        <h1 className="font-medium">{messageContent}</h1>
      </div>
    </div>
  )
}