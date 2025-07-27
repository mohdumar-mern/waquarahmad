'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import Table from '@/components/Table'
import { Edit, Plus, Trash, View } from 'lucide-react'
import { useGetSkillsQuery, useDeleteSkillMutation } from '@/features/skills/skillApiSlice'
import SkillForm from '@/components/skills and services/SkillForm'
import Delete from '@/components/deleteModal/Delete'

const Skills = () => {
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedSkillId, setSelectedSkillId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const { data: skills, isLoading, isError, isSuccess } = useGetSkillsQuery()
  const [deleteSkill] = useDeleteSkillMutation()

  // Loading and error handling
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
  if (isError) return <p className="text-red-500 text-center">Error fetching skills</p>
  if (!isSuccess) return null

  const skillList = skills.ids.map(id => skills.entities[id])

  // Handlers
  const addHandler = () => {
    setIsEditing(false)
    setSelectedSkillId(null)
    setShowFormModal(true)
  }

  const editHandler = (id) => {
    setIsEditing(true)
    setSelectedSkillId(id)
    setShowFormModal(true)
  }

  const confirmDeleteHandler = (id) => {
    setSelectedSkillId(id)
    setShowDeleteModal(true)
  }

  const deleteHandler = async () => {
    try {
      const res = await deleteSkill(selectedSkillId).unwrap()
      alert(res?.message || 'Skill deleted successfully!')
    } catch (err) {
      console.error('Delete failed:', err)
      alert('❌ Failed to delete skill')
    } finally {
      setShowDeleteModal(false)
      setSelectedSkillId(null)
    }
  }

  // Table columns
  const columns = [
    { key: 'sr', label: 'Sr No', render: (row, index) => index + 1 },
    { key: 'title', label: 'Skill Name' },
    { key: 'createdAt', label: 'Created On', render: row => new Date(row.createdAt).toLocaleDateString() },
    {
      key: 'actions',
      label: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <button onClick={() => editHandler(row._id)} className="text-blue-600 hover:underline">
            <Edit size={16} />
          </button>
          <button onClick={() => confirmDeleteHandler(row._id)} className="text-red-600 hover:underline">
            <Trash size={16} />
          </button>
          <button className="text-green-600 hover:underline">
            <View size={16} />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Skill List</h1>
        <button
          onClick={addHandler}
          className="border-b border-r border-black text-black px-4 py-2 rounded-sm flex gap-2 items-center"
        >
          <Plus />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills Table */}
      <Table columns={columns} data={skillList} />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        title={isEditing ? 'Edit Skill' : 'Add Skill'}
      >
        <SkillForm
          isService={false}
          skillId={selectedSkillId}
          isEditing={isEditing}
          onClose={() => setShowFormModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <Delete
          onDelete={deleteHandler}
          onCancel={() => setShowDeleteModal(false)}
        />
      </Modal>
    </div>
  )
}

export default Skills
