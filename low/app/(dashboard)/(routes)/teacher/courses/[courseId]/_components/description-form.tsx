"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const DescriptionForm = ({
  initialData,
  courseId
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

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
    <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
    <div className="mt-6 border selected_post bg-slate-100 rounded-2xl p-6 flex-1">
      <div className="font-medium flex items-center justify-between">
        <span className="text-white">Course description</span>
        {isEditing && (
              <div className="flex flex-row pb-3">
                <div className="flex items-center gap-x-2">
                  <Button
                    disabled={!isValid || isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
                <div className="flex items-center gap-x-2">
                  <Button
                    disabled={!isValid || isSubmitting}
                    type="button"
                    variant="ghost"
                    autoFocus={false}
                    onClick={toggleEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
              {isEditing ? (
                <></>
              ) : (
                <Button onClick={toggleEdit} variant="ghost" type="button" autoFocus={false}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Description
                  </Button>
              )}
      </div>
      {!isEditing && (
        <div>
          <Textarea
            disabled={true}
            style={{ height: '20vh', padding: '2rem' }}
            placeholder={initialData.description || "This Course is about..."}
          />
        </div>
      )}
      {isEditing && (
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      style={{ height: '50vh', background: '#0D0D0D' }}
                      placeholder="e.g. 'This course is about...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      )}
    </div>

          </form>
        </Form>
  )
}