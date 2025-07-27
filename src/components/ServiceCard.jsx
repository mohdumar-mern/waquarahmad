'use client';

import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectServiceById } from "@/features/services/serviveApiSlice";
import { selectSkillById } from "@/features/skills/skillApiSlice";
import { Edit } from "lucide-react";
import Modal from "@/components/UI/Modal";
import SkillForm from "@/components/skills and services/SkillForm";

const ServiceCard = ({ serviceId: seId, skillId: skId }) => {
  const service = useSelector((state) => selectServiceById(state, seId));
  const skill = useSelector((state) => selectSkillById(state, skId));

  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const data = service || skill;
  if (!data) return null;

  const { _id, title, description, image } = data;

  const editHandler = (id) => {
    setIsEditing(true);
    setSelectedSkillId(id);
    setShowFormModal(true);
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 w-full flex flex-col items-center gap-4">
      
      {image?.url && (
        <div className="relative w-20 h-20">
          <Image
            src={image.url}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-full border-2 border-gray-200"
          />
        </div>
      )}

      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      <button
        onClick={() => editHandler(_id)}
        className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline transition-all"
      >
        <Edit size={18} />
        Edit
      </button>

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

       <Modal
              isOpen={showFormModal}
              onClose={() => setShowFormModal(false)}
              title={isEditing ? "Edit Service" : "Add Service"}
            >
              <SkillForm
                isService={true}
                serviceId={seId}
                isEditing={isEditing}
                onClose={() => setShowFormModal(false)}
              />
            </Modal>
    </div>
  );
};

export default ServiceCard;
