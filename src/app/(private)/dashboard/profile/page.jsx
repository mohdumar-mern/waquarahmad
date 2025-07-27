"use client";

import UpdateProfile from "@/components/profile/UpdateProfile";
import Modal from "@/components/Modal";
import {
  useGetProfilePicQuery,

  useGetSocailLinksQuery,
} from "@/features/profile/profileApiSlice";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
    const [showFormModal, setShowFormModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [profileId, setProfileId] = useState(null)

  const {
    data: profilePic,
    isLoading: profilePicIsLoading,
    isError: profilePicIsError,
    error: profilePicError,
  } = useGetProfilePicQuery();
  const {
    data: socialLinks,
    isLoading: socialIsLoading,
    isError: socialIsError,
    error: socialError,
  } = useGetSocailLinksQuery();

  // Handle loading and error states
  if (profilePicIsLoading  || socialIsLoading)
    return <p className="mt-4 text-gray-500">Loading...</p>;

  if (profilePicIsError)
    return <p className="text-red-500 mt-4">{profilePicError?.message || "Error loading profile picture."}</p>;

  // if (resumeIsError)
  //   return <p className="text-red-500 mt-4">{resumeError?.message || "Error loading resume."}</p>;

  if (socialIsError)
    return <p className="text-red-500 mt-4">{socialError?.message || "Error loading social links."}</p>;


    const editHandler = (id) => {
    setProfileId(id)
    setShowFormModal(true)
  }
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Name */}
        <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Waquar Ahmad</h1>
              <button
                onClick={() =>editHandler(profilePic.id)}
                className="border-b border-r border-black text-black px-4 py-2 rounded-sm flex gap-2 items-center"
              >
                <Edit /> <span>Update Profile</span>
              </button>
            </div>

      {/* Profile Image */}
      <figure>
        <img
          src={profilePic?.url}
          alt="Profile"
          className="rounded-full w-40 h-40 object-cover border"
        />
      </figure>
      

      {/* Resume Actions */}
 
        <div className="flex gap-4">
          {/* View Resume */}
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}profile/resume`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline capitalize"
          >
            View Resume
          </a>

        </div>

      {/* Social Links */}
      <div className="flex gap-4 flex-wrap">
        {Object.entries(socialLinks || {}).map(([platform, url]) => (
          <Link
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline capitalize"
          >
            {platform}
          </Link>
        ))}
      </div>
      
   <Modal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        title="Update Profile"
      >
        <UpdateProfile
          isService={true}
          profileId={profileId}
          onClose={() => setShowFormModal(false)}
        />
      </Modal>
   
    </div>
  );
};

export default Profile;
