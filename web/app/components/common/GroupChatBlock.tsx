import { FaCircle } from "react-icons/fa";

export interface GroupChatBlock {
  groupColor: string;
  groupName: string;
  isSelected: boolean;
  groupId: string;
  changeGroup: (groupId: string) => void;
}

export default function GroupChatBlock({
  groupColor,
  groupName,
  groupId,
  isSelected,
  changeGroup,
}: GroupChatBlock) {
  // const MAX_LAST_MSG_SIZE = 50;
  // const truncateText = (text: string, size: number) => text.length <= size ? text : (text.substring(0, size - 3) + '...');

  return (
    // Tailwind conditional shenanigans
    <div
      className={`w-full flex items-center duration-100 ease-in-out ${
        isSelected ? "bg-[#1f1f1f]" : "bg-[#252525]"
      } hover:bg-[#1f1f1f] rounded-xl p-2 mt-1`}
      onClick={(e) => changeGroup(groupId)}
    >
      <img
        src={FaCircle}
        className="w-10 h-10 mr-4 rounded-full"
        alt="Group Chat Image"
      />
      <div className="w-full min-w-0 flex flex-col break-words">
        <h1 className="text-m font-medium">{groupName}</h1>
        {/* <h3 className="text-sm font-light text-stone-200">{truncateText(lastMessage, MAX_LAST_MSG_SIZE)}</h3> */}
      </div>
      {/* { hasNotification && <FaCircle className="ml-2" color="crimson" /> } */}
    </div>
  );
}
