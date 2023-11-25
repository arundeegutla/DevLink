import { SkillType } from '@models/icons';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Skill = ({
  isSelected,
  onClick,
  className,
  shouldHover = true,
  ...skill
}: SkillType & {
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  shouldHover?: boolean;
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    onClick();
  };

  const handleMouseEnter = () => {
    setIsHovering(shouldHover);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className={twMerge(
        `animated animatedFadeInUp fadeInUp p-3 mx-1 my-1 flex flex-row items-center cursor-pointer transition-all duration-500 ease-in-out bg-gray-800 text-gray-400 rounded-md select-none`,
        className
      )}
      style={{
        backgroundColor: isSelected
          ? `${skill.color}cc`
          : isHovering
          ? `${skill.color}cc`
          : '',
        color: isHovering || isSelected ? '#ffffffcc' : '',
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

export default Skill;
