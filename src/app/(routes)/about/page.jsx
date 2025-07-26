import About from "./About";

export const metadata = {
  title: "About Waquar | 3D Artist & Full-Stack Developer",
  description:
    "Discover Waquar's journey as a 3D artist, animator, and full-stack developer. Explore his skills and creativity in both art and code.",
  keywords: [
    "Waquar",
    "3D Artist",
    "Animator",
    "Full-Stack Developer",
    "JavaScript",
    "React",
    "Node.js",
    "Portfolio",
  ],
  openGraph: {
    title: "About Waquar",
    description: "Meet Waquar, a passionate 3D artist and full-stack developer.",
    url: "https://yourdomain.com/about",
    images: [
      {
        url: "https://yourdomain.com/images/waquar-og.png",
        width: 800,
        height: 600,
        alt: "Waquar 3D Artist Portfolio",
      },
    ],
  },
  robots: "index, follow",
};

export default function AboutPage() {
  return (
      <About />
  );
}