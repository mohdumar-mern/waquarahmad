import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData) => ({
        url: '/auth/login',
        method: 'POST',
        body: formData,
        credentials: 'include', // ✅ include cookies
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
        credentials: 'include', // ✅ ensure cookies are sent
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation, // ✅ changed from Query to Mutation
} = authApiSlice;
