import React from "react";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import {
  CircleDollarSign,
  File,
  LayoutDashboardIcon,
  ListChecks,
} from "lucide-react";
import TitleForm from "./_components/title-from";
import DescriptionForm from "./_components/description-from";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChapterForm from "./_components/chapter-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!course) return redirect("/");
  //making our api protected. only the valid user can enter the course page

  // console.log(categories);

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),

    //
  ];
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const totalFields = requiredFields.length;
  const filledFields = requiredFields.filter(Boolean).length;
  const completionText = `(${filledFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label=" This course is unpublished. It will not be visible in the course"
        />
      )}
      <div className=" p-6">
        <div className=" flex items-center justify-between ">
          <div className=" flex flex-col gap-y-2">
            <h1 className=" text-2xl font-medium">Course Setup</h1>
            <span className=" text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          {/* Actions  */}
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboardIcon} size="sm" />
              <h2 className="text-xl">Customize Your Course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Chapter</h2>
              </div>
              <div
                className="
            "
              >
                <ChapterForm initialData={course} courseId={course.id} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Pricing</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
