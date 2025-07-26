// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

console.log(process.env.NEXT_PUBLIC_API_URL)
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:  process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include', // <-- Add this to send cookies
  }),
  tagTypes: ['Project', 'Skill', 'Service', 'Login', 'Contact'],
  endpoints: () => ({}),
})
