'use client'

import ServiceCard from "@/components/ServiceCard"
import { useGetSkillsQuery } from "@/features/skills/skillApiSlice"

const Skills = () => {
  const { data: skills, isLoading, isError, isSuccess, error } = useGetSkillsQuery()

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
  if (isError) return <p className="text-red-500 text-center">Error fetching projects</p>

  if (!isSuccess) return null

  const { ids, entities } = skills

  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 py-10">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {
          ids.map((id) => {
            // const service = entities[id]
            return <ServiceCard key={id} skillId={id} />
          })

        }
      </section>

    </div>)
}

export default Skills