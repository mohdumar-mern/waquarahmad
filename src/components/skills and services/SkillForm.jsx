"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  useAddSkillMutation,
  useUpdateSkillMutation,
  selectSkillById,
} from "@/features/skills/skillApiSlice";
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
  selectServiceById,
} from "@/features/services/serviveApiSlice";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Zod schema
const schema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", {
      message: "Thumbnail is required",
    }),
  featured: z.boolean().optional(),
});

const SkillForm = ({ skillId, serviceId, onClose, isEditing, isService }) => {
  const [addSkill, { isLoading: addSkillLoading }] = useAddSkillMutation();
  const [updateSkill, { isLoading: updateSkillLoading }] = useUpdateSkillMutation();
  const [addService, { isLoading: addServiceLoading, isError: isAddError, error: AddError, isSuccess: isAddSuccess }] = useAddServiceMutation();
  console.log("isAddError", isAddError, "AddError", AddError, "isAddSuccess", isAddSuccess)
  const [updateService, { isLoading: updateServiceLoading }] = useUpdateServiceMutation();

  const existingSkill = useSelector((state) => selectSkillById(state, skillId));
  const existingService = useSelector((state) => selectServiceById(state, serviceId));

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      featured: false,
    },
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const data = skillId ? existingSkill : serviceId ? existingService : null;

    if (data && isEditing) {
      form.reset({
        title: data.title || "",
        description: data.description || "",
        image: data.image?.url || "",
        featured: data.featured || false,
      });

      setPreviewImage(data.image?.url || null);
    }
  }, [existingSkill, existingService, skillId, serviceId, isEditing, form]);

  const onSubmit = async (formData) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("featured", formData.featured ? "true" : "false");

    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    try {
      if (isEditing) {
        if (isService) {
          await updateService({ id: serviceId, body: data }).unwrap();
          alert("✅ Service updated successfully");
        } else {
          await updateSkill({ id: skillId, body: data }).unwrap();
          alert("✅ Skill updated successfully");
        }
      } else {
        if (isService) {
          await addService(data).unwrap();
          alert("✅ Service added successfully");
        } else {
          await addSkill(data).unwrap();
          alert("✅ Skill added successfully");
        }
      }


      form.reset();
      onClose?.();
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("❌ Failed to submit");
    }
  };

  const isLoading =
    addSkillLoading || updateSkillLoading || addServiceLoading || updateServiceLoading;

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <div>
                    {previewImage && typeof field.value === "string" && (
                      <img
                        src={field.value}
                        alt="Current thumbnail"
                        className="h-20 rounded-md mb-2"
                      />
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPreviewImage(URL.createObjectURL(file));
                          field.onChange(file);
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Featured */}
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="h-4 w-4"
                  />
                </FormControl>
                <FormLabel className="!mb-0">Featured</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? isEditing
                ? "Updating..."
                : "Submitting..."
              : isEditing
                ? "Update"
                : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default SkillForm;
