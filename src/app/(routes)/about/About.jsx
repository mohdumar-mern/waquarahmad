// app/about/page.tsx
import Pic from "@/components/profile/Pic";

// ✅ SEO metadata (can also use next-seo for advanced setup)
export const metadata = {
  title: "About | Waquar",
  description: "Meet Waquar — a 3D Artist, Animator, and Full-Stack Developer with skills in React, Node.js, and more.",
};

export const dynamic = "force-dynamic"; // optional: SSR every time

// ✅ Replace with real fetch from API or DB in production
async function getSkills() {
  return [
    "JavaScript",
    "React",
    "Node.js",
    "Git",
    "NPM",
    "Express",
    "MongoDB",
    "Docker",
    "Redis",
  ];
}

export default async function AboutPage() {
  const skills = await getSkills();

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 px-6 py-12 max-w-6xl min-h-[70vh] mx-auto"
      aria-labelledby="about-heading"
    >
      {/* Text Content */}
      <div className="space-y-6 text-center md:text-left md:col-span-2">
        <h1
          id="about-heading"
          className="text-4xl font-extrabold text-gray-900"
        >
          Hi, I'm Waquar 👋
        </h1>
        <h2 className="text-2xl text-gray-600 font-semibold">
          3D Artist • Animator • Full-Stack Developer
        </h2>
        <p className="text-gray-500 text-base leading-relaxed">
          I craft stunning 3D animations and develop fast, scalable full-stack
          applications. Passionate about design and performance, I bring ideas
          to life through code and creativity.
        </p>

        {/* Skills List */}
        <div>
          <h3 className="text-gray-700 text-2xl font-semibold mb-2">
            Skills
          </h3>
          <ul
            className="flex flex-wrap gap-3"
            aria-label="Developer skill list"
          >
            {skills.map((skill) => (
              <li
                key={skill}
                title={skill}
                className="bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-transform text-gray-600 px-4 py-2 rounded-lg cursor-default shadow-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Avatar Image via Profile Component */}
      <Pic />
    </section>
  );
}
