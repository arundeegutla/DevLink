import { twMerge } from 'tailwind-merge';
import { BsArrowUpRight } from 'react-icons/bs';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';

export interface ProjectCardProps {
  id: string;
  title: string;
  color: string;
  role: string;
}

export default function ProjectCard(item: ProjectCardProps) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out relative rounded-lg mr-4 mt-4 bg-[#22222253] hover:bg-[#57575753] p-2 border-l-[5px] cursor-pointer overflow-hidden w-80`}
      style={{
        borderColor: `${item.color}`,
      }}>
      <div className="relative z-10 flex flex-row justify-between">
        <div className="flex flex-col w-fit mt-2 mr-7 mb-20">
          <div className="text-xl">{item.title}</div>
          <div className="text-lg text-gray-500">{item.role}</div>
        </div>
        <div className="flex flex-col space-y-2">
          {/* <div className="transition-all duration-300 ease-in-out rounded-full p-3 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]">
            <BsArrowUpRight className="text-2xl" />
          </div> */}
          <div className="transition-all duration-300 ease-in-out rounded-full p-3 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]">
            <BiSolidMessageSquareDetail className="text-2xl" />
          </div>
        </div>
      </div>

      <div
        className="absolute -top-6 -right-6 w-36 h-36 opacity-20 filter blur-[70px] rounded-full"
        style={{ backgroundColor: `${item.color}` }}></div>
    </div>
  );
}
