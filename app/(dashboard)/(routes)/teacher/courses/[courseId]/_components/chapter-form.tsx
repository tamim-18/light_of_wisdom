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
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Pencil, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { ChaptersList } from "./chapters-list";
interface ChapterFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}
const formSchema = z.object({
  title: z.string().min(1),
});

const ChapterForm = ({ initialData, courseId }: ChapterFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter Created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Failed to update course title");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapter order updated");
    } catch {
      toast.error("Failed to update chapter order");
    } finally {
      setIsUpdating(false);
    }
  };
  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapter/${id}`);
  };
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((prev) => !prev);
  const router = useRouter();

  return (
    <div className="relative mt-6 bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 rounded-m flex items-center justify-center">
          <Loader2 className=" animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className=" flex font-medium items-center justify-between">
        Course Chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating && <>Cancel</>}
          {!isCreating && (
            <>
              <Plus className=" h-4 w-4 mr-2" />
              Add course chapters
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="eg. 'Description of the course'"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm sm-2",
            initialData.chapters.length === 0 && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters.length && "No Chapters"}
          {/* TO Do Chapters */}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className=" text-xs text-muted-foreground mt-4">
          Drag and Drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
