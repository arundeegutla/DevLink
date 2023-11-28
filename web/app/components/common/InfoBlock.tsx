export interface InfoBlock {
  infoLink: string,
  Icon: React.ElementType
}

export default function InfoBlock({
  infoLink,
  Icon,
}: InfoBlock) {
  return (
    <div className="flex items-center">
      <Icon className="mr-4" />
      <a href={infoLink} className="group transition duration-300">
        {infoLink}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
      </a>
    </div>
  )
}