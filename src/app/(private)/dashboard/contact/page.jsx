'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Table from '@/components/ui/Table'
import { View, Trash } from 'lucide-react'
import Delete from '@/components/deleteModal/Delete'
import {
  useGetContactsQuery,
  useDeleteContactMutation, // ✅ Your mutation to delete
} from '@/features/contacts/contactApiSlice'

const Contact = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedContactId, setSelectedContactId] = useState(null)

  const { data: contacts, isLoading, isError, isSuccess } = useGetContactsQuery()
  const [deleteContact] = useDeleteContactMutation() // ✅ initialize mutation hook

  const confirmDeleteHandler = (id) => {
    setSelectedContactId(id)
    setShowDeleteModal(true)
  }

  const deleteHandler = async () => {
    try {
      const res = await deleteContact(selectedContactId).unwrap()
      alert(res?.message || 'Contact deleted successfully!')
    } catch (err) {
      console.error('Delete failed:', err)
      alert('❌ Failed to delete contact')
    } finally {
      setShowDeleteModal(false)
      setSelectedContactId(null)
    }
  }

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
  if (isError) return <p className="text-red-500 text-center">Error fetching contacts</p>
  if (!isSuccess || !contacts) return null

  const { ids = [], entities = {} } = contacts
  const contactList = ids.map(id => entities[id])

  const columns = [
    { key: 'sr', label: 'Sr No', render: (row, index) => index + 1 },
    { key: 'name', label: 'Name' },
    {
      key: 'createdAt',
      label: 'Created On',
      render: row => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <button className="text-green-600 hover:underline">
            <View size={16} />
          </button>
          <button
            onClick={() => confirmDeleteHandler(row._id)}
            className="text-red-600 hover:underline"
          >
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contact Dashboard</h1>
      </div>

      <Table columns={columns} data={contactList} />

      {showDeleteModal && (
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
      )}
    </div>
  )
}

export default Contact
