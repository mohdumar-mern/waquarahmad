'use client'

import { useCallback, useState } from 'react'
import Modal from '@/components/Modal'
import Table from '@/components/Table'
import { Edit, Trash, View } from 'lucide-react'
import { useGetProjectsQuery } from '@/features/projects/projectApi'
import AddProject from '@/components/projects/AddProject'

const Projects = () => {
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [projectId, setProjectId] = useState(null)

  const { data: projects, isLoading, isError, isSuccess } = useGetProjectsQuery()

  const addHandler = useCallback(() => {
    setIsEditing(false)
    setProjectId(null)
    setShowModal(true)
  }, [])

  const editHandler = useCallback((id) => {
    setIsEditing(true)
    setProjectId(id)
    setShowModal(true)
  }, [])

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
  if (isError) return <p className="text-red-500 text-center">Error fetching projects</p>
  if (!isSuccess || !projects) return null

  const { ids = [], entities = {} } = projects
  const projectList = ids.map(id => entities[id])

  const columns = [
    { key: 'sr', label: 'Sr No', render: (row, index) => index + 1 },
    { key: 'title', label: 'Project Name' },
    {
      key: 'createdAt',
      label: 'Created On',
      render: row => new Date(row.createdAt).toLocaleDateString()
    },
    {
      key: 'actions',
      label: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <button onClick={() => editHandler(row._id)} className="text-blue-600 hover:underline"><Edit size={16} /></button>
          <button className="text-green-600 hover:underline"><View size={16} /></button>
          <button className="text-red-600 hover:underline"><Trash size={16} /></button>
        </div>
      )
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Dashboard</h1>
        <button
          onClick={addHandler}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      <Table columns={columns} data={projectList} />

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

export default Projects
