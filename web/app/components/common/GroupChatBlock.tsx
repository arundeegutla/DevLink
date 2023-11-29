import { FaCircle } from 'react-icons/fa';
import Image from 'next/image';
import { toPastelColor } from './PostCard';

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
  return (
    // Tailwind conditional shenanigans
    <div
      className={`cursor-pointer relative w-full flex items-center duration-100 ease-in-out py-3 border-b-2 px-2 border-gray-600 rounded-none mx-0 my-0 backdrop-blur-2xl text-gray-300 ${
        isSelected ? 'bg-[#ffffff] text-gray-900' : 'bg-[#252525]'
      } hover:bg-[#1c1c1c] hover:text-gray-200`}
      // style={{ borderColor: `${groupColor}` }}
      onClick={(e) => changeGroup(groupId)}>
      <div className="w-full min-w-0 break-words flex flex-row items-center">
        <div className="flex flex-row items-center">
          <div
            className="text-xl mr-2 w-10 h-10 aspect-square! rounded-full flex flex-row items-center justify-center"
            style={{ backgroundColor: toPastelColor(groupColor, 0.4) }}>
            <div className="text-lg font-semibold text-gray-200">
              {groupName.charAt(0)}
            </div>
          </div>
        </div>
        <h1 className="text-m font-medium">{groupName}</h1>
      </div>
    </div>
  );
}
