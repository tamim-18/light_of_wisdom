import React from "react";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import {
  CircleDollarSign,
  LayoutDashboardIcon,
  ListChecks,
} from "lucide-react";
import TitleForm from "./_components/title-from";
import DescriptionForm from "./_components/description-from";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const userId = auth();
  if (!userId) return redirect("/");
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  // console.log(categories);

  if (!course) return redirect("/");
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];
  const totalFields = requiredFields.length;
  const filledFields = requiredFields.filter(Boolean).length;
  const completionText = `(${filledFields}/${totalFields})`;
  return (
    <div className=" p-6">
      <div className=" flex items-center justify-between ">
        <div className=" flex flex-col gap-y-2">
          <h1 className=" text-2xl font-medium">Course Setup</h1>
          <span className=" text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
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
              To DO chapters
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Pricing</h2>
            </div>
            <PriceForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
