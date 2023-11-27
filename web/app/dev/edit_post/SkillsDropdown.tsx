import { SkillType, Icons } from '@models/icons';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Skill from './Skill';

const SkillsDropdown = ({
  selectedSkills,
  setSelectedSkills,
  mySkills,
  className,
}: {
  selectedSkills: string[];
  setSelectedSkills: Dispatch<SetStateAction<string[]>>;
  mySkills: SkillType[];
  className: string;
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (event: any) => {
    setSearchVal(event.target.value);
  };

  const handleSkillClick = (selectedSkill: SkillType) => {
    setIsOpen(false);
    setSearchVal('');
    setSelectedSkills((skills) => {
      return [...skills, selectedSkill.name];
    });
  };

  const handleToggleDropdown = () => {
    setIsOpen(true);
  };

  const handleNewSkillClick = (newSkill: SkillType) => {
    mySkills.push(newSkill);
    handleSkillClick(newSkill);
  };

  const getNewName = (name: string) => {
    return name
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  };

  const createNewSkill = (name: string) => {
    name = getNewName(name);

    let newSkill: SkillType = {
      name: name,
      color: '#695217',
      icon: Icons.Heart,
    };
    return [newSkill];
  };

  const handleCloseDropDown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseDropDown);
    return () => {
      document.removeEventListener('mousedown', handleCloseDropDown);
    };
  }, []);

  return (
    <div className={twMerge(`flex flex-col items-start w-full`, className)}>
      <div
        className={`rounded-xl bg-gray-950 overflow-hidden p-2 flex flex-row items-center mt-0.5 text-gray-200 border-2 border-gray-500 ${
          isOpen && 'rounded-b-none'
        }`}>
        <Icons.Plus className="text-xl mr-2 text-gray-400" />
        <input
          type="search"
          placeholder="Add Skill"
          className="bg-transparent focus:outline-none w-full"
          onChange={handleSearchChange}
          onClick={handleToggleDropdown}
          value={searchVal}
        />
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="animated animatedFadeInUp fadeInUp w-full flex flex-col items-stretch justify-start transition-all duration-500 ease-in-out bg-transparent blur-20 max-h-[200px] overflow-y-scroll border-2 border-gray-500 border-t-0 rounded-b-xl">
          {mySkills.map(
            (x) =>
              x.name
                .toLowerCase()
                .indexOf(getNewName(searchVal).toLowerCase()) === 0 &&
              !selectedSkills.some(
                (skill) => skill.toLowerCase() === x.name.toLowerCase()
              ) && (
                <Skill
                  key={x.name}
                  {...x}
                  isSelected={selectedSkills.some((skill) => skill === x.name)}
                  onClick={() => handleSkillClick(x)}
                  className="border-t-2 border-gray-600 rounded-none mx-0 my-0 backdrop-blur-2xl bg-opacity-75"
                />
              )
          )}
          {searchVal.length > 0 &&
            !mySkills.some(
              (skill) =>
                skill.name.toLowerCase() === getNewName(searchVal).toLowerCase()
            ) && (
              <>
                {createNewSkill(searchVal).map((x) => (
                  <Skill
                    key={x.name}
                    {...x}
                    isSelected={false}
                    onClick={() => handleNewSkillClick(x)}
                    className="border-t-2 border-gray-600 rounded-none mx-0 my-0 backdrop-blur-2xl bg-opacity-75"
                  />
                ))}
              </>
            )}
        </div>
      )}
    </div>
  );
};

export default SkillsDropdown;
