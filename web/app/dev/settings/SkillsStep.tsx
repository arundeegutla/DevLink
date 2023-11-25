import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { SkillType, Icons, skills } from '@models/icons';
import { StepProps } from './page';
import Stepper from '@components/common/Stepper';

export default function SkillsStep({ onNext, onBack }: StepProps) {
  const [searchVal, setSearchVal] = useState('');

  const handleSearchChange = (event: any) => {
    setSearchVal(event.target.value);
  };

  let mySkills = skills;

  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);

  const handleSkillClick = (selectedSkill: SkillType) => {
    setSearchVal('');
    setSelectedSkills((prevSelectedSkills) => {
      const isSkillSelected = prevSelectedSkills.some(
        (skill) => skill.name === selectedSkill.name
      );

      if (isSkillSelected) {
        return prevSelectedSkills.filter(
          (skill) => skill.name !== selectedSkill.name
        );
      } else {
        return [...prevSelectedSkills, selectedSkill];
      }
    });
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

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold text-gray-300">
        Enhance Your Skill Set
      </h1>
      <h1 className="text-md w-[40%] text-gray-500 text-center mt-3">
        Highlight your expertise by listing the skills and technologies you
        excel in.
      </h1>

      <div className="w-fit rounded-xl bg-gray-950 overflow-hidden p-2 flex flex-row items-center mt-3 text-gray-200 border-2 border-gray-500">
        <LuSearch className="text-xl mr-2 text-gray-400" />
        <input
          type="search"
          placeholder="Search or add skills"
          className="bg-transparent focus:outline-none w-72"
          onChange={handleSearchChange}
          value={searchVal}
        />
      </div>

      <div className="animated animatedFadeInUp fadeInUp mt-4 w-[60%] flex flex-row flex-wrap items-center justify-center transition-all duration-500 ease-in-out">
        {mySkills.map(
          (x) =>
            x.name
              .toLowerCase()
              .includes(getNewName(searchVal).toLowerCase()) && (
              <Skill
                key={x.name}
                {...x}
                isSelected={selectedSkills.some(
                  (skill) => skill.name === x.name
                )}
                onClick={() => handleSkillClick(x)}
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
                />
              ))}
            </>
          )}
      </div>
      <Stepper onNext={onNext} onBack={onBack} />
    </div>
  );
}

const Skill = ({
  isSelected,
  onClick,
  ...skill
}: SkillType & { isSelected: boolean; onClick: () => void }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    onClick();
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className={twMerge(
        `p-3 flex flex-row items-center cursor-pointer mx-1 my-1 rounded-md transition-all duration-500 ease-in-out bg-gray-800 text-gray-400`
      )}
      style={{
        backgroundColor: isSelected
          ? skill.color
          : isHovering
          ? `${skill.color}33`
          : '',
        color: isHovering || isSelected ? '#ffffff' : '',
        boxShadow: `0px 0px 0px ${isHovering || isSelected ? '2px' : '0px'} ${
          skill.color
        } inset`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}>
      {<skill.icon className="text-xl mr-2" />}
      {skill.name}
    </div>
  );
};
