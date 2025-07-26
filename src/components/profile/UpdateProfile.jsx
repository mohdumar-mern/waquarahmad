"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetProfileQuery,
  useUpdateProfileMutation
} from "@/features/profile/profileApiSlice";

const profileSchema = z.object({
  username: z.string().min(2, "Username is required"),
  linkedin: z.string().min(10, "LinkedIn must be at least 10 characters"),
  twitter: z.string().min(10, "Twitter must be at least 10 characters"),
  instagram: z.string().min(10, "Instagram must be at least 10 characters"),
  youtube: z.string().min(10, "YouTube must be at least 10 characters"),
  profilepic: z.any().refine(val => val instanceof File || typeof val === "string", {
    message: "Profile picture is required",
  }),
  resume: z.any().refine(val => val instanceof File || typeof val === "string", {
    message: "Resume is required",
  }),
});

const UpdateProfile = ({ onClose }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [resumeName, setResumeName] = useState("");

  const [updateProfile, { isLoading: updateLoading }] = useUpdateProfileMutation();
  const { data, isLoading, isError, error } = useGetProfileQuery();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      youtube: "",
      profilepic: "",
      resume: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        username: data.username || "",
        linkedin: data.socialLinks?.linkedin || "",
        twitter: data.socialLinks?.twitter || "",
        instagram: data.socialLinks?.instagram || "",
        youtube: data.socialLinks?.youtube || "",
        profilepic: data.profilepic?.url || "",
        resume: data.resume?.url || "",
      });

      setPreviewUrl(data.profilepic?.url || "");
      setResumeName(data.resume?.originalname || "");
    }
  }, [data, form]);

  const onSubmit = async (formDataValues) => {
    const formData = new FormData();
    formData.append("username", formDataValues.username);
    formData.append("linkedin", formDataValues.linkedin);
    formData.append("twitter", formDataValues.twitter);
    formData.append("instagram", formDataValues.instagram);
    formData.append("youtube", formDataValues.youtube);

    if (formDataValues.profilepic instanceof File) {
      formData.append("profilepic", formDataValues.profilepic);
    }

    if (formDataValues.resume instanceof File) {
      formData.append("resume", formDataValues.resume);
    }

    try {
      await updateProfile(formData).unwrap();
      alert("✅ Profile updated successfully!");
      form.reset();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update profile");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">{error?.message || "Failed to load profile"}</p>;

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Social Links */}
          {["linkedin", "twitter", "instagram", "youtube"].map((platform) => (
            <FormField
              key={platform}
              control={form.control}
              name={platform}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{platform}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={`Enter ${platform} link`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Profile Picture Upload */}
          <FormField
            control={form.control}
            name="profilepic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          setPreviewUrl(URL.createObjectURL(file));
                        }
                      }}
                    />
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="mt-4 h-40 w-auto rounded border"
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resume Upload */}
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          setResumeName(file.name);
                        }
                      }}
                    />
                    {resumeName && (
                      <p className="mt-2 text-sm text-gray-600">Uploaded: {resumeName}</p>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={updateLoading}>
            {updateLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UpdateProfile;
