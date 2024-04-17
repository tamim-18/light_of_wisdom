"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Preview } from "@/components/preview";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Chapter } from "@prisma/client";
import { Editor } from "@/components/editor";

interface ChapterDescriptionFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}
const formSchema = z.object({
  description: z.string().min(1),
});

const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterDescriptionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "empty description",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter Updated");
      toggleEditing();
      router.refresh();
    } catch {
      toast.error("Failed to update course title");
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);
  const router = useRouter();

  return (
    <div className=" mt-6 bg-slate-100 rounded-md p-4">
      <div className=" flex font-medium items-center justify-between">
        Chapter Description
        <Button onClick={toggleEditing} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {!initialData.description && "No description"}
          {initialData.description && (
            <Preview value={initialData.description} />
          )}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex items-center gap-x-2 ">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
