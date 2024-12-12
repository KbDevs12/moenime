import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface EpisodeCardProps {
  index: number;
  title: string | undefined;
  date: string | undefined;
  slug: string | undefined;
}

export default function EpisodeCard(props: EpisodeCardProps) {
  return (
    <Link
      key={props.index}
      href={`/episode/${props.slug}`}
      className="bg-violet-900/30 p-4 rounded-lg hover:bg-violet-900/50 transition-colors"
    >
      <div className="flex justify-between items-center">
        <span className="text-violet-400">{props.title}</span>
        <ChevronRight className="text-violet-500" size={20} />
      </div>
      <p className="text-sm text-gray-400 mt-2">{props.date}</p>
    </Link>
  );
}
