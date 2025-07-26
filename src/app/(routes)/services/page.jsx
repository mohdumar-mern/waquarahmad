'use client';
import ServiceCard from "@/components/ServiceCard";
import { useGetServicesQuery } from "@/features/services/serviveApiSlice";
const Services = () => {

  const {
    data: services,
    isSuccess,
    isError,
    isLoading,
    error
  }
    = useGetServicesQuery()



  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
  if (isError) return <p className="text-red-500 text-center">Error fetching projects</p>

  if (!isSuccess) return null

  const { ids, entities } = services
  // console.log(entities)


  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 py-10">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {
            ids.map((id) => {
              // const service = entities[id]
              return <ServiceCard key={id} serviceId={id} />
            })

          }
      </section>

    </div>
  )
}

export default Services