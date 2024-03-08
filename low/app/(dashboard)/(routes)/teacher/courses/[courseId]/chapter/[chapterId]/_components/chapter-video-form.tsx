"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import MuxPlayer from "@mux/mux-player-react";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ImageIcon, Pencil, Plus, Video } from "lucide-react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, MuxData } from "@prisma/client";
import Image from "next/image";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}
const formSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData?.videoUrl || "",
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
        Course Video
        <Button onClick={toggleEditing} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <Plus className=" h-4 w-4 mr-2" />
              Add Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className=" flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className=" h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className=" relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter's video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className=" text-xs text-muted-foreground mt-2">
          Video can take a fex minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
