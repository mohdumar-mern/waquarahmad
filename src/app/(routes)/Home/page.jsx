// app/page.tsx or app/home/page.tsx

import Link from "next/link";
import Pic from "@/components/profile/Pic";
import SocialLinks from "@/components/profile/SocialLinks";

// Basic SEO metadata (for advanced control, consider next-seo)
export const metadata = {
  title: "Mohd Umar | Frontend Developer",
  description: "Explore Mohd Umar’s frontend development portfolio built with React, Tailwind CSS, and modern tools.",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-24">
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
          Hi, I'm Mohd Umar
        </h1>
        <h2 className="text-2xl md:text-4xl mt-3 text-gray-700">
          Frontend Developer
        </h2>
        <p className="text-gray-600 mt-5 text-base md:text-lg">
          I build performant and beautiful web applications using React, Tailwind CSS, and modern frontend technologies.
        </p>

        {/* 🔗 Social Links */}
        <div className="flex justify-center gap-5 mt-6 text-2xl">
          <SocialLinks />
        </div>

        {/* 📄 Resume & Projects */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}profile/resume`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-300"
            aria-label="Download Resume"
          >
            View Resume
          </a>

          <Link
            href="/projects"
            className="border border-black py-2 px-6 rounded-md hover:bg-gray-100 transition duration-300"
            aria-label="View Projects"
          >
            View Projects
          </Link>
        </div>
      </section>

      {/* 👤 Profile Image */}
      <div className="mt-16">
        <Pic />
      </div>
    </main>
  );
}
