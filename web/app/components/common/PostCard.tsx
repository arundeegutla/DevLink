import { Post } from '@models/samples/posts';
interface PostCardProps {
  post: Post;
}
export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="my-2 w-fit">
      <div className="rounded-t-2xl bg-blue-500 p-5">{post.title}</div>
      <div className="bg-[#0d0d0db6] p-4">{post.body}</div>
      <div className="p-5 border-t-2 border-red-50 rounded-b-2xl bg-amber-900"></div>
    </div>
  );
}
