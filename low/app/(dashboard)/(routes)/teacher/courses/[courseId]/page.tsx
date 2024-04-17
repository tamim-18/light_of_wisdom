import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";

import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { Actions } from "./_components/actions";
import { DescriptionForm } from "./_components/description-form";
import { ChaptersForm } from "./_components/chapters-form";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
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

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">

          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
        <Actions
          disabled={!isComplete}
          courseId={params.courseId}
          isPublished={course.isPublished}
        />
      </div>
      <div className="flex flex-wrap gap-10">
        <ImageForm
          initialData={course}
          courseId={course.id}
          categories={categories}
        />
        <div className="flex-1">

          <DescriptionForm
            initialData={course}
            courseId={course.id}
          />
          <div>
            <ChaptersForm
              initialData={course}
              courseId={course.id}
            />
          </div>
          <div>
          </div>
        </div>
      </div>
      <div className="h-[30vh]"></div>
    </div>
  );
}

export default CourseIdPage;