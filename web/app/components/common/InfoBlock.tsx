import { IconType } from 'react-icons';

export interface InfoBlock {
  content: string;
  href: string;
  Icon: IconType;
}

export default function InfoBlock({ content, href, Icon }: InfoBlock) {
    <div className="flex items-center">
      <Icon className="mr-4" />
      <a href={infoLink} className="group transition duration-300">
        {infoLink}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
      </a>
    </div>
  );
}
