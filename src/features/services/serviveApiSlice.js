import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const serviceAdapter = createEntityAdapter({});
const initialState = serviceAdapter.getInitialState();

export const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "/services",
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const services = responseData?.data || responseData;
        if (!Array.isArray(services)) {
          console.error("Unexpected services format:", services);
          return initialState;
        }
        const loadedServices = services.map((service) => ({
          ...service,
          id: service._id,
        }));
        return serviceAdapter.setAll(initialState, loadedServices);
      },
      providesTags: (result) =>
        result?.ids
          ? [
            { type: "Service", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Service", id })),
          ]
          : [{ type: "Service", id: "LIST" }],
    }),
    addService: builder.mutation({
      query: (newService) => ({
        url: "/services",
        method: "POST",
        body: newService,
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),
    updateService: builder.mutation({
      query: ({id, body}) => ({
        url: `/services/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result) => [{ type: "Service", id: result.id }],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Service", id }],
    }),
  }),
});


export const { 
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
 } = serviceApiSlice;

// Selector for raw API result
export const selectServicesResult =
  serviceApiSlice.endpoints.getServices.select();

// Memoized normalized data selector
const selectServicesData = createSelector(
  selectServicesResult,
  (servicesResult) => servicesResult?.data ?? initialState
);

// Export normalized selectors
export const {
  selectAll: selectAllServices,
  selectById: selectServiceById,
  selectIds: selectServiceIds,
} = serviceAdapter.getSelectors(
  (state) => selectServicesData(state) || initialState
);
