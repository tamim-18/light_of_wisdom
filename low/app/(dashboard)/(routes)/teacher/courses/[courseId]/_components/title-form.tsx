"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const TitleForm = ({
  initialData,
  courseId
}: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
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
    <div className="mt-6 border btn bg-slate-100 rounded-2xl p-4">
      <div className="font-medium text-[silver] flex items-center justify-between">
        <span style={{ color: "silver" }}>{"Course title"}</span>
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
                  Edit Title
                  </Button>
              )}
      </div>
      {!isEditing && (
        <p className="text-xl mt-2"><b>
          {initialData.title}</b>
        </p>
      )}
      {isEditing && (
        
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      style={{ background: "#0D0D0D" }}
                      placeholder="e.g. 'Advanced web development'"
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