'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { selectProjectsData, selectProjectsPagination, useGetProjectsQuery } from '@/features/projects/projectApi'
import ProjectCard from '@/components/ProjectCard'
import Pagination from '@/components/Pagination'
import { wrapper } from '@/store/store'
import { projectApi } from '@/features/projects/projectApi'

const Projects = () => {
  const [page, setPage] = useState(1)
  const limit = 6

  const { data, isLoading, isError, refetch } = useGetProjectsQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: true,
    }
  )

//   const pagination = useSelector(selectProjectsPagination);
// const projects = useSelector(selectProjectsData);
// console.log("projects", projects)
// console.log('pagination', pagination)

  const projects = data?.entities ? Object.values(data.entities) : []
  const pagination = data?.pagination

  console.log("projects", projects)
console.log('pagination', pagination)
  useEffect(() => {
    refetch()
  }, [page])

  const { videoProjects, imageProjects } = useMemo(() => {
    const video = []
    const image = []
    projects.forEach((p) =>
      p?.ytlink?.trim() ? video.push(p) : image.push(p)
    )
    return { videoProjects: video, imageProjects: image }
  }, [projects])

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Error fetching projects.</p>
        <button onClick={refetch} className="mt-2 text-sm text-blue-600 underline">
          Retry
        </button>
      </div>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-14">
      {/* Video Projects */}
      {videoProjects.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6">🎬 Video Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videoProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Image Projects */}
      {imageProjects.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6">🖼️ Image Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {imageProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* No Projects */}
      {videoProjects.length === 0 && imageProjects.length === 0 && (
        <p className="text-center text-gray-500">No projects found.</p>
      )}

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </main>
  )
}

export default Projects

// ✅ SSR with Redux prefetch
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ query }) => {
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 6

    store.dispatch(
      projectApi.util.prefetch('getProjects', { page, limit }, { force: true })
    )

    await Promise.all(store.dispatch(projectApi.util.getRunningOperationPromises()))

    return { props: {} }
  }
)
