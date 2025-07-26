'use client';

import { useGetProfilePicQuery } from "@/features/profile/profileApiSlice";
import Image from "next/image";

const Pic = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetProfilePicQuery();

  if (isLoading) {
    return <p className="mt-4 text-center text-gray-500">Loading profile picture...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 mt-4 text-center">
        {error?.data?.message || "Error loading profile picture."}
      </p>
    );
  }

  const profilePicUrl = data?.url || "/images/waquar.png";

  return (
    <div className="flex justify-center mt-10">
      <figure className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-md border-2 border-gray-200">
        <Image
          src={profilePicUrl}
          alt="Profile Picture"
          width={320}
          height={320}
          className="object-cover w-full h-full"
          priority
        />
      </figure>
    </div>
  );
};

export default Pic;
