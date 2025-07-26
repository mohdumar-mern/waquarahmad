// components/SocialLink.jsx
import Link from "next/link";

const IconLink = ({ icon: Icon, title, href, size = 28, className = "" }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      aria-label={title}
      className={`inline-block text-gray-600 hover:text-black transition-all ${className}`}
    >
      <Icon size={size} />
    </Link>
  );
};

export default IconLink;
