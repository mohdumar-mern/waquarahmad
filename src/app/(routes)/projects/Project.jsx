'use client'

import ProjectCard from "@/components/ProjectCard"
import { useGetProjectsQuery } from "@/features/projects/projectApi"

const Projects = () => {
  const { data: projects, isLoading, isError } = useGetProjectsQuery()

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
  if (isError) return <p className="text-red-500 text-center">Error fetching projects</p>

  const { ids, entities } = projects || { ids: [], entities: {} }

  const videoProjects = ids.filter(id => entities[id]?.ytlink)
  const imageProjects = ids.filter(id => !entities[id]?.ytlink)

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-14">
      {/* 🔹 Video Projects Section */}
      {videoProjects.length > 0 && (
        <section aria-label="Video Projects">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
            🎬 Video Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videoProjects.map(id => (
              <ProjectCard key={id} projectId={id} />
            ))}
          </div>
        </section>
      )}

      {/* 🔹 Image-only Projects Section */}
      {imageProjects.length > 0 && (
        <section aria-label="Image Projects">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
            🖼️ Image Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {imageProjects.map(id => (
              <ProjectCard key={id} projectId={id} />
            ))}
          </div>
        </section>
      )}

      {/* 🔹 No Projects Fallback */}
      {videoProjects.length === 0 && imageProjects.length === 0 && (
        <p className="text-center text-gray-500">No projects found.</p>
      )}
    </main>
  )
}

export default Projects
