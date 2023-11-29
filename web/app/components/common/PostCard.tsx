import { Post, condensedPost } from '@/hooks/models';
import { Icons, skillMap } from '@/models/icons';
import Link from 'next/link';

interface PostCardProps {
  post: Post | condensedPost;
  color: string;
  numSkillsMatched?: number;
}
export default function PostCard({
  post,
  numSkillsMatched,
  color,
}: PostCardProps) {
  return (
    <div className="mr-3 mb-3 relative w-72 h-fit bg-[#f5f5f5] p-1 rounded-xl overflow-hidden border-[1px] border-gray-500">
      {/* Inside Card */}
      <div
        className="p-2 rounded-lg h-52 flex flex-col"
        style={{ backgroundColor: toPastelColor(color, 0.8) }}>
        <div className="text-black text-xl font-medium">{post.title}</div>
        <div className="text-gray-700 text-sm">{post.body}</div>

        {/* Skills */}
        <div className="mt-auto">
          {numSkillsMatched && (
            <div className="flex flex-row items-center gap-1 border-2 rounded-lg px-3 w-fit border-gray-600 bg-[#f5f5f555]">
              <div className="items-center flex flex-col justify-center text-2xl text-gray-900 font-bold ">
                {numSkillsMatched}
              </div>
              <div className="text-xs text-gray-600">
                skill{numSkillsMatched > 1 && 's'} matched
              </div>
            </div>
          )}
          <div className="flex flex-row gap-1 mt-1 flex-wrap">
            {post.skillsWanted.map((skill) => {
              const IconComponent = skillMap[skill] ?? {
                name: skill,
                color: 'not found',
                icon: Icons.Heart,
              };
              return (
                <div
                  key={skill}
                  className="rounded-lg bg-gray-800 text-gray-200 px-3 py-2 text-sm flex flex-row items-center gap-1">
                  <IconComponent.icon className="text-lg" />
                  {IconComponent.color === 'not found' && skill}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Info */}

      {numSkillsMatched && (
        <div className="mt-2 mb-1 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <div className="text-lg text-gray-800 font-medium ml-2">
              {(post as Post).owner.name}
            </div>
            <div className="text-sm text-gray-800 font-medium -mt-1">
              {/* should put something here */}
              {/* {post.owner.description} */}
            </div>
          </div>

          <Link
            target="_blank"
            href={`/dev/project/${(post as Post).owner.id}`}
            className="rounded-full flex flex-row bg-gray-900 px-3 py-1 gap-2 items-center text-gray-300 cursor-pointer hover:text-gray-500">
            <Icons.ArrowUpRight />
            Details
          </Link>
        </div>
      )}
    </div>
  );
}
function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function toPastelColor(hex: string, lightness: number): string {
  let c = hex.substring(1); // strip #
  const rgb = [
    parseInt(c.substring(0, 2), 16),
    parseInt(c.substring(2, 4), 16),
    parseInt(c.substring(4, 6), 16),
  ];
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  l = lightness; // adjust lightness
  s = s > 0.5 ? 0.5 : s; // decrease saturation to make it pastel

  return hslToHex(h * 360, s * 100, l * 100);
}
