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
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = ({
  initialData,
  courseId
}: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
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
        <div className="mt-6 border bg-slate-100 rounded-2xl p-4">
          <div className="font-medium text-gray-600 flex items-center justify-between">
            Course price
            {isEditing && (
              <div className="flex flex-row relative pb-1">
                <div className="flex-2"></div>
              <div className="flex-0 flex flex-row py-1 relative right-0">
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
              </div>
            )}
              {isEditing ? (
                <></>
              ) : (
                <Button onClick={toggleEdit} variant="ghost" type="button" autoFocus={false}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit price
                  </Button>
              )}
          </div>
          {!isEditing && (
            <p className={cn(
              "text-sm mt-2",
              !initialData.price && "text-slate-500 italic"
            )}><b>
              {initialData.price
                ? formatPrice(initialData.price)
                : "No price"
              }</b>
            </p>
          )}
          {isEditing && (

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
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