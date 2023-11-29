// Icons
import { BsArrowUpRight } from 'react-icons/bs';

export interface ProfilePageProject {
  title: string;
  color: string;
  description: string;
}

export default function ProfilePageProject({
  title,
  color,
  description,
}: ProfilePageProject) {
  return (
    <div
      className="relative w-full h-18 flex items-center justify-between rounded-xl bg-[#1f1f1f53] p-4 mt-2 transition-all duration-300 ease-in-out hover:bg-[#57575753] border-l-[5px] cursor-pointer overflow-hidden"
      style={{
        borderColor: `${color}`,
      }}>
      {/* Project info */}
      <div className="w-11/12 h-full flex flex-col">
        <h1 className="font-medium text-base">{title}</h1>
        <h3 className="font-normal text-sm">{description}</h3>
      </div>
      {/* Link to page */}
      <div className="w-10 h-10 flex items-center transition-all duration-300 ease-in-out rounded-full p-2 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7] z-10">
        <BsArrowUpRight className="text-2xl" />
      </div>
      {/* Backglow */}
      <div
        className="absolute w-10 h-10 right-6 opacity-80 filter blur-[80px] rounded-full"
        style={{ backgroundColor: `${color}` }}></div>
    </div>
  );
}
