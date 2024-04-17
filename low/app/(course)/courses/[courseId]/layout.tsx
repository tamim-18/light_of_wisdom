import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }
  console.log(course.categoryId);

  const progressCount = await getProgress(userId, course.id);
  console.log(progressCount);

  return (
    <div>
      <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="mt-[85px] justify-center items-center h-full">
        <div className="flex h-[80vh] overflow-y-auto flex-wrap gap-10">
          <div className="overflow-y-auto w-[60vw]">
            <main>{children}</main>
          </div>
          <CourseSidebar course={course} progressCount={progressCount} />

        </div>
      </div>
    </div>
  );
};

export default CourseLayout;
