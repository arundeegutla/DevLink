import { condensedGroup } from "@/hooks/models";
import { Icons } from "@/models/icons";
import Link from "next/link";
import { useState } from "react";

export default function ProjectCard(item: condensedGroup) {
  const [hovering, setIsHovering] = useState(false);

  const params = new URLSearchParams();
  params.append('groupId', item.id);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`transition-all duration-300 ease-in-out relative rounded-lg mr-4 mt-4 bg-[#22222253] p-2 border-l-[5px] cursor-pointer overflow-hidden w-80 ${
        hovering && ``
      }`}
      style={{
        borderColor: `${item.color}`,
      }}
    >
      <div className="relative z-10 flex flex-row justify-between">
        <div className="flex flex-col w-fit mt-2 mr-7 mb-20">
          <div className="text-xl">{item.name}</div>
          <div className="text-lg text-gray-500">{item.description}</div>
        </div>
        <div className="flex flex-col space-y-2">
          <Link
            href={`/dev/inbox/?${params.toString()}`}
            className="transition-all duration-300 ease-in-out rounded-full p-3 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]"
          >
            <Icons.Message className="text-2xl" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-2 z-50 right-2">
        {hovering && (
          <div className="animated animatedFadeInUp fadeInUp transition-all duration-300 ease-in-out rounded-full text-[#C1C1C1] hover:text-[#C1C1C133]">
            <Icons.ArrowUpRight className="text-2xl" />
          </div>
        )}
      </div>
      <div
        className="absolute -top-6 -right-6 w-36 h-36 opacity-20 filter blur-[70px] rounded-full"
        style={{ backgroundColor: `${item.color}` }}
      ></div>
    </div>
  );
}
