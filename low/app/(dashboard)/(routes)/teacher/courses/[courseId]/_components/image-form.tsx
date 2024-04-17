"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { CameraIcon } from "@radix-ui/react-icons";
import { CategoryForm } from "./category-form";
import { PriceForm } from "./price-form";
import { TitleForm } from "./title-form";

interface ImageFormProps {
  initialData: Course
  courseId: string;
  categories: { id: string; name: string }[];
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({
  initialData,
  courseId,
  categories
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-2xl p-4">
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
      <div className="relative">
        {!isEditing && (
          !initialData.imageUrl ? (
            <img
              src="https://placehold.co/600x400?text=Add%20Cover%20Picture"
              alt="Placeholder"
              className="h-[40vh]"
            />
          ) : (
            <img
              src={initialData.imageUrl}
              alt="Placeholder"
              className="md:w-[30vw] w-full"
            />

          )
        )}
        <div className="absolute right-0 top-0 p-4">
          <Button onClick={toggleEdit}>
            {isEditing && (
              <>Cancel</>
            )}
            {!isEditing && !initialData.imageUrl && (
              <>
                <PlusCircle className="h-4 w-4" />
              </>
            )}
            {!isEditing && initialData.imageUrl && (
              <>
                <CameraIcon className="h-6 w-4 mr-2" fontSize={"large"} />
              </>
            )}
          </Button>
        </div>
        <div >
          <TitleForm
            initialData={initialData}
            courseId={courseId}
          />
          <CategoryForm
            initialData={initialData}
            courseId={courseId}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <PriceForm
            initialData={initialData}
            courseId={courseId}
          />
        </div>
      </div>

    </div>
  )
}