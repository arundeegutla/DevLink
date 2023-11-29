import { IconType } from 'react-icons';

export interface InfoBlock {
  content: string;
  href: string;
  Icon: IconType;
}

export default function InfoBlock({ content, href, Icon }: InfoBlock) {
  return (
    <a target="_blank" href={href} className="flex flex-row items-center mt-2">
      <Icon className="text-3xl mr-4 " />
      {content}
    </a>
  );
}
