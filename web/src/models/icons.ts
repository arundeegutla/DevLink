import {
  FaUser,
  FaHeart,
  FaAngleLeft,
  FaAngleRight,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
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
  SiMongodb,
} from 'react-icons/si';

import {
  MdError,
  MdDangerous,
  MdExplore,
  MdSpaceDashboard,
} from 'react-icons/md';
import { GrStatusGood } from 'react-icons/gr';
import { IconType } from 'react-icons';
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsFillPlusCircleFill,
  BsLightbulbFill,
  BsTelephoneFill,
} from 'react-icons/bs';
import { HiOutlinePlus } from 'react-icons/hi2';
import { LuSearch } from 'react-icons/lu';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import { IoEarthOutline, IoSettingsSharp, IoMail } from 'react-icons/io5';

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
  PlusCircleFille: BsFillPlusCircleFill,
  Plus: HiOutlinePlus,
  Search: LuSearch,
  MongoDB: SiMongodb,
  Phone: BsTelephoneFill,
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  DashBoard: MdSpaceDashboard,
  Message: BiSolidMessageSquareDetail,
  Explore: MdExplore,
  Earth: IoEarthOutline,
  Settings: IoSettingsSharp,
  LightBulb: BsLightbulbFill,
  Email: IoMail,
};

export const skills: SkillType[] = [
  { name: 'JavaScript', color: '#fbc02d', icon: Icons.JavaScript },
  { name: 'React.js', color: '#0288d1', icon: Icons.React },
  { name: 'Node.js', color: '#1b5e20', icon: Icons.NodeJs },
  { name: 'HTML5', color: '#c62828', icon: Icons.HTML5 },
  { name: 'CSS3', color: '#0d47a1', icon: Icons.CSS3 },
  { name: 'Python', color: '#5e35b1', icon: Icons.Python },
  { name: 'Java', color: '#C1691C', icon: Icons.Java },
  { name: 'Git', color: '#d32f2f', icon: Icons.Git },
  { name: 'SQL', color: '#1565c0', icon: Icons.Database },
  { name: 'Docker', color: '#0288d1', icon: Icons.Docker },
  { name: 'Vue.js', color: '#1b5e20', icon: Icons.Vuejs },
  { name: 'Angular', color: '#c62828', icon: Icons.Angular },
  { name: 'TypeScript', color: '#0d47a1', icon: Icons.TypeScript },
  { name: 'Ruby on Rails', color: '#b71c1c', icon: Icons.Ruby },
  { name: 'Swift', color: '#e64a19', icon: Icons.Swift },
  { name: 'Flutter', color: '#0d47a1', icon: Icons.Flutter },
  { name: 'Sass', color: '#d81b60', icon: Icons.Sass },
  { name: 'GraphQL', color: '#c2185b', icon: Icons.GraphQL },
  { name: 'Redux', color: '#4527a0', icon: Icons.Redux },
  { name: 'Firebase', color: '#ff8f00', icon: Icons.Firebase },
  { name: 'Django', color: '#004d40', icon: Icons.Django },
  { name: 'Bootstrap', color: '#4527a0', icon: Icons.Bootstrap },
  { name: 'Tailwind CSS', color: '#0097a7', icon: Icons.TailwindCSS },
  { name: 'MongoDB', color: '#004d40', icon: Icons.MongoDB },
];
