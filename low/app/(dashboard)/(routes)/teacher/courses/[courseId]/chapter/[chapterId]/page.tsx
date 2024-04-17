import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeftCircle, Eye, LayoutDashboardIcon, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-from";
import ChapterAccessForm from "./_components/chapter-access-form";
import ChapterVideoForm from "./_components/chapter-video-form";
import { Banner } from "@/components/banner";
import { ChapterActions } from "./_components/chapter-actions";

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
    include: {
      muxData: true,
    },
  });
  if (!chapter) return redirect("/");

  const requireFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requireFields.length;
  const completedFields = requireFields.filter(Boolean).length;
  const completedText = `${completedFields}/${totalFields} fields completed`;
  const isComplete = requireFields.every(Boolean);
  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label=" This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between ">
          <div className="w-full">
            <Link
              className=" flex items-center text-sm hover:opacity-75 transition mb-6"
              href={`/teacher/courses/${params.courseId}`}
            >
              <ArrowLeftCircle className=" h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className=" flex items-center justify-between w-full">
              <div className=" flex flex-col gap-y-2">
                <h1 className=" text-2xl font-medium"> Create Your Chapter</h1>
                <span className=" text-sm text-slate-700">{completedText}</span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-col  gap-6 mt-16 ">
          <div className=" space-y-4">
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <div>
              {/* Chapter titleform */}
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div className=" ">
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ChapterId;
