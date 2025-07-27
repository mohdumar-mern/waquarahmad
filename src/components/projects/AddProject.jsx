'use client'

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from "react-redux"

import { Button } from "@/components/ui/Button"
import {
  Form, FormField, FormItem, FormLabel,
  FormControl, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  useAddProjectMutation,
  useUpdateProjectMutation,
  selectProjectById
} from "@/features/projects/projectApi"

const projectSchema = z.object({
  title: z.string().min(2, "Project title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  softwares: z.string().min(1, "Softwares are required"),
  ytlink: z.string().url("Invalid YouTube URL").optional().or(z.literal("")),
  thumbnail: z
    .any()
    .refine(val => val instanceof File || typeof val === "string", {
      message: "Thumbnail is required",
    }),
  featured: z.boolean().optional(),
})

const AddProject = ({ projectId, isEditing = false, onClose }) => {
  const existingProject = useSelector(state => selectProjectById(state, projectId))

  const [addProject] = useAddProjectMutation()
  const [updateProject, { isLoading }] = useUpdateProjectMutation()

  const [previewUrl, setPreviewUrl] = useState("")

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      softwares: "",
      ytlink: "",
      thumbnail: "",
      featured: false,
    },
  })

  useEffect(() => {
    if (isEditing && existingProject) {
      form.reset({
        title: existingProject.title || "",
        description: existingProject.description || "",
        softwares: existingProject.softwares || "",
        ytlink: existingProject.ytlink || "",
        thumbnail: existingProject.thumbnail?.url || "",
        featured: existingProject.featured || false,
      })

      setPreviewUrl(existingProject.thumbnail?.url || "")
    }
  }, [isEditing, existingProject, form])

  const onSubmit = async (data) => {
    const formData = new FormData()

    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("softwares", data.softwares)
    formData.append("ytlink", data.ytlink || "")
    formData.append("featured", data.featured ? "true" : "false")

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail)
    }

    try {
      if (isEditing && projectId) {
        await updateProject({ id: projectId, body: formData }).unwrap()
        alert("✅ Project updated successfully")
      } else {
        await addProject(formData).unwrap()
        alert("✅ Project added successfully")
      }

      form.reset()
      setPreviewUrl("")
      onClose?.()
    } catch (err) {
      console.error(err)
      alert("❌ Failed to submit project")
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter project title" />
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

          {/* Softwares */}
          <FormField
            control={form.control}
            name="softwares"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Softwares</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Comma-separated e.g., Blender, Figma" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* YouTube link */}
          <FormField
            control={form.control}
            name="ytlink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>YouTube Link</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://youtube.com/..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail Upload */}
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.onChange(file)
                          setPreviewUrl(URL.createObjectURL(file))
                        }
                      }}
                    />
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mt-4 h-40 w-auto rounded border"
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Featured Checkbox */}
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

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isEditing ? "Update Project" : "Add Project"}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default AddProject
