import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function post(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const url = await req.json();
  } catch (error) {
    console.log("COURSE_ATTACHMENT_ROUTE_ERROR: ", error);
    return new NextResponse("Invalid Eror", { status: 500 });
  }
}
