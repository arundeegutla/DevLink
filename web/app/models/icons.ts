import { FaUser, FaHeart, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3,
  FaPython,
  FaJava,
  FaGitAlt,
  FaDatabase,
  FaDocker,
  FaVuejs,
  FaAngular,
  FaSwift,
  FaSass,
} from 'react-icons/fa';
import {
  SiFlutter,
  SiGraphql,
  SiTypescript,
  SiRuby,
  SiRedux,
  SiFirebase,
  SiDjango,
  SiBootstrap,
  SiTailwindcss,
} from 'react-icons/si';

import { MdError, MdDangerous } from 'react-icons/md';
import { GrStatusGood } from 'react-icons/gr';
import { IconType } from 'react-icons';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

export type SkillType = {
  name: string;
  icon: IconType;
  color: string;
};

export const Icons = {
  User: FaUser,
  Heart: FaHeart,
  CheckCircle: GrStatusGood,
  Warning: MdError,
  Danger: MdDangerous,
  JavaScript: FaJsSquare,
  React: FaReact,
  NodeJs: FaNodeJs,
  HTML5: FaHtml5,
  CSS3: FaCss3,
  Python: FaPython,
  Java: FaJava,
  Git: FaGitAlt,
  Database: FaDatabase,
  Docker: FaDocker,
  Vuejs: FaVuejs,
  Angular: FaAngular,
  TypeScript: SiTypescript,
  Ruby: SiRuby,
  Swift: FaSwift,
  Flutter: SiFlutter,
  Sass: FaSass,
  GraphQL: SiGraphql,
  Redux: SiRedux,
  Firebase: SiFirebase,
  Django: SiDjango,
  Bootstrap: SiBootstrap,
  TailwindCSS: SiTailwindcss,
  RightArrowCircleFilled: BsArrowRightCircleFill,
  LeftArrowCircleFilled: BsArrowLeftCircleFill,
  RightArrowAngle: FaAngleRight,
  LeftArrowAngle: FaAngleLeft,
};

export const skills: SkillType[] = [
  { name: 'JavaScript', icon: Icons.JavaScript, color: '#f7df1e' },
  { name: 'React.js', icon: Icons.React, color: '#61dafb' },
  { name: 'Node.js', icon: Icons.NodeJs, color: '#68a063' },
  { name: 'HTML5', icon: Icons.HTML5, color: '#e34c26' },
  { name: 'CSS3', icon: Icons.CSS3, color: '#1572b6' },
  { name: 'Python', icon: Icons.Python, color: '#4b8bbe' },
  { name: 'Java', icon: Icons.Java, color: '#5382a1' },
  { name: 'Git', icon: Icons.Git, color: '#f05032' },
  { name: 'SQL', icon: Icons.Database, color: '#336791' },
  { name: 'Docker', icon: Icons.Docker, color: '#2496ed' },
  { name: 'Vue.js', icon: Icons.Vuejs, color: '#41b883' },
  { name: 'Angular', icon: Icons.Angular, color: '#dd1b16' },
  { name: 'TypeScript', icon: Icons.TypeScript, color: '#3178c6' },
  { name: 'Ruby on Rails', icon: Icons.Ruby, color: '#cc0000' },
  { name: 'Swift', icon: Icons.Swift, color: '#ff5722' },
  { name: 'Flutter', icon: Icons.Flutter, color: '#02569b' },
  { name: 'Sass', icon: Icons.Sass, color: '#cc6699' },
  { name: 'GraphQL', icon: Icons.GraphQL, color: '#e10098' },
  { name: 'Redux', icon: Icons.Redux, color: '#764abc' },
  { name: 'Firebase', icon: Icons.Firebase, color: '#ffca28' },
  { name: 'Django', icon: Icons.Django, color: '#092e20' },
  { name: 'Bootstrap', icon: Icons.Bootstrap, color: '#7952b3' },
  { name: 'Tailwind CSS', icon: Icons.TailwindCSS, color: '#38b2ac' },
];
