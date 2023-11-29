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

  return (
    // Tailwind conditional shenanigans
    <div
      className={`relative w-full flex items-center duration-100 ease-in-out ${
        isSelected ? "bg-[#1f1f1f]" : "bg-[#252525]"
      } hover:bg-[#1f1f1f] rounded-xl p-2 mt-2 border-l-[5px]`} style={{ borderColor: `${groupColor}` }}
      onClick={(e) => changeGroup(groupId)}
    >
      <div className="w-full min-w-0 flex flex-col break-words">
        <h1 className="text-m font-medium">{groupName}</h1>
      </div>
    </div>
  );
}
