'use client';

import { useGetSocailLinksQuery } from '@/features/profile/profileApiSlice';
import IconLink from '../IconLink';
import { Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const iconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
};

const SocialLinks = () => {
  const { data: socialLinks, isLoading, isError, error } = useGetSocailLinksQuery();
  if (isError) {
    return (
      <div className="text-red-500 mt-4">
       {error.message || error.data.message || ' Error loading social links.'}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-4 text-gray-500">
        Loading social links...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
      {Object.entries(socialLinks || {}).map(([platform, url]) => {
        const Icon = iconMap[platform.toLowerCase()];
        if (!Icon || !url) return null;

        return (
          <IconLink
            key={platform}
            icon={Icon}
            title={platform}
            href={url}
          />
        );
      })}
    </div>
  );
};

export default SocialLinks;
