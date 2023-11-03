interface PostCardProps {
  user: string;
  time: string;
  userphoto: string;
  description: string;
  setLike: (value: string) => void;
}
export default function PostCard({
  user,
  time,
  userphoto,
  description,
  setLike,
}: PostCardProps) {
  return (
    <div className="my-2 w-full mx-0 overflow-clip">
      <div className="rounded-t-2xl bg-blue-500 p-5 overflow-clip">{user}</div>
      <div className="bg-[#0d0d0db6] p-20">{description}</div>
      <div className="p-5 border-t-2 border-red-50 rounded-b-2xl bg-amber-900"></div>
    </div>
  );
}
