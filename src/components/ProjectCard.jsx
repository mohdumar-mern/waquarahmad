'use client'

import { selectProjectById } from "@/features/projects/projectApi"
import { Edit } from "lucide-react"
import { useSelector } from "react-redux"
import Modal from "@/components/ui/Modal"
import AddProject from "@/components/projects/AddProject"
import { useCallback, useState } from "react"

const ProjectCard = ({ projectId:id }) => {
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [projectId, setProjectId] = useState(null)

  const project = useSelector((state) => selectProjectById(state, id))



  const editHandler = useCallback((id) => {
    setIsEditing(true)
    setProjectId(id)
    setShowModal(true)
  }, [])
  if (!project) return null

  const {_id, ytlink, thumbnail, title, description, softwares, createdAt, updatedAt } = project

  const getEmbedUrl = (url) => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match?.[1] ? `https://www.youtube.com/embed/${match[1]}` : null
  }

  const embedUrl = getEmbedUrl(ytlink)

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg border transition-all overflow-hidden">
      <div className="w-full">
        {embedUrl ? (
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              title={title}
            />
          </div>
        ) : (
          <img
            src={thumbnail?.url}
            alt={title}
            className="w-full h-60 object-cover"
          />
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        {/* Tags */}
        {softwares?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {softwares.map((tool, i) => (
              <span
                key={i}
                className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        )}

        {/* Dates */}
        <div className="text-xs text-gray-400 flex justify-between pt-2">
          <div className="flex flex-col">
            <span>Created: {formatDate(createdAt)}</span>
            <span>Updated: {formatDate(updatedAt)}</span>
          </div>
          <button onClick={() => editHandler(_id)} className="text-blue-600 hover:underline cursor-pointer"><Edit size={24} /></button>


        </div>
      </div>

        {showModal && (
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={isEditing ? "Edit Project" : "Add Project"}
              >
                <AddProject projectId={projectId} isEditing={isEditing} onClose={() => setShowModal(false)} />
              </Modal>
            )}
    </div>
  )
}

export default ProjectCard
