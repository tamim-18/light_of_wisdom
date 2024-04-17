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
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
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
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="mt-6 border btn bg-slate-100 rounded-2xl p-4">
          <div className="font-medium text-[silver] flex items-center justify-between">
            Course category
            {isEditing && (
              <div className="flex flex-row pb-3">
                <div className="flex items-center gap-x-2">
                  <Button disabled={!isValid || isSubmitting} type="submit">
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
              <Button
                onClick={toggleEdit}
                variant="ghost"
                type="button"
                autoFocus={false}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Category
              </Button>
            )}
          </div>
          {!isEditing && (
            <p
              className={cn(
                "text-large mt-2",
                !initialData.categoryId && "text-slate-500 italic"
              )}
            >
              <b>{selectedOption?.label || "No category"}</b>
            </p>
          )}
          {isEditing && (
            <div className=" text-slate-800">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox options={...options} {...field} />
                    </FormControl>
                    <FormMessage style={{ background: "#0D0D0D" }} />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};
