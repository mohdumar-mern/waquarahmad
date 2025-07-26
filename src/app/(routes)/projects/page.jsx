export const metadata = {
  title: "Projects | Waquar's Portfolio",
  description:
    "Explore Waquar's creative and technical projects – from 3D animations to full-stack applications built with modern technologies.",
  keywords: [
    "Projects",
    "Waquar",
    "3D Portfolio",
    "React Projects",
    "Full-Stack Apps",
    "YouTube Ads",
    "Node.js",
  ],
  openGraph: {
    title: "Waquar's Projects",
    description: "A showcase of Waquar's professional and creative work.",
    url: "https://yourdomain.com/projects",
    images: [
      {
        url: "https://yourdomain.com/images/projects-og.png",
        width: 800,
        height: 600,
        alt: "Waquar Projects",
      },
    ],
  },
  robots: "index, follow",
};

import React from "react";
import Projects from "./Project";
export default function ProjectsPage() {
  return (
      <Projects />
  );
}