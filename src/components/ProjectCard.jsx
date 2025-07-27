'use client'

import { useSelector } from "react-redux"
import { useCallback, useMemo, useState } from "react"
import { selectProjectById } from "@/features/projects/projectApi"
import { Edit } from "lucide-react"
import Modal from "@/components/UI/Modal"
import AddProject from "@/components/projects/AddProject"

const ProjectCard = ({ project }) => {
  
console.log(project)
  const [modalState, setModalState] = useState({ show: false, isEditing: false })

  const openEditModal = useCallback(() => {
    setModalState({ show: true, isEditing: true })
  }, [])

  const closeModal = useCallback(() => {
    setModalState({ show: false, isEditing: false })
  }, [])

  const embedUrl = useMemo(() => {
    if (!project?.ytlink?.trim()) return null
    const match = project.ytlink.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match?.[1] ? `https://www.youtube.com/embed/${match[1]}` : null
  }, [project?.ytlink])

  const formatDate = date =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  if (!project) return null

  const { _id, thumbnail, title, description, softwares, createdAt, updatedAt } = project

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg border transition-all overflow-hidden">
      {/* Media */}
      <div className="w-full">
        {embedUrl ? (
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              title={title}
              loading="lazy"
            />
          </div>
        ) : (
          <img
            src={thumbnail?.url}
            alt={title}
            className="w-full h-60 object-cover"
            loading="lazy"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        {/* Tags */}
        {softwares?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {softwares.map((tool, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-xs text-gray-400 flex justify-between pt-2 items-center">
          <div className="flex flex-col">
            <span>Created: {formatDate(createdAt)}</span>
            <span>Updated: {formatDate(updatedAt)}</span>
          </div>
          <button
            onClick={openEditModal}
            className="text-blue-600 hover:underline flex items-center gap-1"
            title="Edit Project"
          >
            <Edit size={18} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalState.show && (
        <Modal isOpen={modalState.show} onClose={closeModal} title="Edit Project">
          <AddProject
            projectId={_id}
            isEditing={modalState.isEditing}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  )
}

export default ProjectCard
