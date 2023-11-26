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
      <a href={infoLink}>{infoLink}</a>
    </div>
  )
}