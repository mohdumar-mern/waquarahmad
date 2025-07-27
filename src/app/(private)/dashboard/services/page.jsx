'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import Table from '@/components/Table'
import { Edit, Plus, Trash, View } from 'lucide-react'
import SkillForm from '@/components/skills and services/SkillForm'
import { useGetServicesQuery, useDeleteServiceMutation } from '@/features/services/serviveApiSlice'
import Delete from '@/components/deleteModal/Delete'

const Services = () => {
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [serviceId, setServiceId] = useState(null)

  const { data: services, isLoading, isError, isSuccess } = useGetServicesQuery()
  const [deleteService] = useDeleteServiceMutation()

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
  if (isError) return <p className="text-red-500 text-center">Error fetching services</p>
  if (!isSuccess) return null

  const { ids, entities } = services
  const servicesList = ids.map(id => entities[id])

  const addHandler = () => {
    setIsEditing(false)
    setServiceId(null)
    setShowFormModal(true)
  }

  const editHandler = (id) => {
    setIsEditing(true)
    setServiceId(id)
    setShowFormModal(true)
  }

  const openDeleteModal = (id) => {
    setServiceId(id)
    setShowDeleteModal(true)
  }

  const deleteHandler = async () => {
    try {
      const res = await deleteService(serviceId).unwrap()
      alert(res?.message || 'Service deleted successfully!')
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete service')
    } finally {
      setShowDeleteModal(false)
      setServiceId(null)
    }
  }

  const columns = [
    { key: 'sr', label: 'Sr No', render: (_, index) => index + 1 },
    { key: 'title', label: 'Service Name' },
    { key: 'createdAt', label: 'Created On', render: row => new Date(row.createdAt).toLocaleDateString() },
    {
      key: 'actions', label: 'Actions', render: row => (
        <div className="flex gap-2">
          <button onClick={() => editHandler(row._id)} className="text-blue-600 hover:underline"><Edit size={16} /></button>
          <button className="text-green-600 hover:underline"><View size={16} /></button>
          <button onClick={() => openDeleteModal(row._id)} className="text-red-600 hover:underline"><Trash size={16} /></button>
        </div>
      )
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services List</h1>
        <button
          onClick={addHandler}
          className="border-b border-r border-black text-black px-4 py-2 rounded-sm flex gap-2 items-center"
        >
          <Plus /> <span>Add Service</span>
        </button>
      </div>

      <Table columns={columns} data={servicesList} />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        title={isEditing ? "Edit Service" : "Add Service"}
      >
        <SkillForm
          isService={true}
          serviceId={serviceId}
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

export default Services
