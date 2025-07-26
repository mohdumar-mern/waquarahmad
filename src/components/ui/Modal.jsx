'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import ModalPortal from '@/components/ModalPortal'

const Modal = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center transition-opacity duration-200">
        <div
          ref={modalRef}
          className="bg-white relative rounded-xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
          >
            <X />
          </button>

          {children}
        </div>
      </div>
    </ModalPortal>
  )
}

export default Modal
