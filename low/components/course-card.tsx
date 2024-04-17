import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="flex flex-row btn gap-5 p-1">
      <div className="relative w-[200px] p-5 aspect-video rounded-md overflow-hidden">
          <Image fill alt={title} src={imageUrl} />
        </div>
      <div className="group hover:shadow-sm transition overflow-hidden p-3 h-full">
        
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-blue-300 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-gray-300">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-[silver]">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-amber-300">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
      </div>
    </Link>
  );
};
