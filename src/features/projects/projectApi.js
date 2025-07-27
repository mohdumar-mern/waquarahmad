// src/features/projects/projectApiSlice.js

import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Entity Adapter for projects
const projectAdapter = createEntityAdapter({
  selectId: (project) => project._id || project.id,
});

const initialState = projectAdapter.getInitialState({
  pagination: {
    totalDocs: 0,
    limit: 6,
    totalPages: 0,
    currentPage: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  },
});

// Inject endpoints
export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ page = 1, limit = 6, search = "", featured = "" } = {}) =>
        `/projects?page=${page}&limit=${limit}&search=${search}&featured=${featured}`,

      validateStatus: (response, result) =>
        response.status === 200 && !result?.isError,

      // Cache for 5 minutes
      keepUnusedDataFor: 300,

      transformResponse: (responseData) => {
        const projects = responseData?.data || [];
        const pagination = responseData?.pagination || {};

        // Normalize data with pagination
        const normalized = projectAdapter.setAll(
          projectAdapter.getInitialState(),
          projects
        );

        return {
          ...normalized,
          pagination,
        };
      },

      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Project", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Project", id })),
            ]
          : [{ type: "Project", id: "LIST" }],
    }),

    addProject: builder.mutation({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),

    updateProject: builder.mutation({
      query: ({ id, body }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: "Project", id: arg.id },
              { type: "Project", id: "LIST" },
            ],
    }),
  }),
});

// Hooks
export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
} = projectApiSlice;

// Selectors
export const selectProjectsResult =
  projectApiSlice.endpoints.getProjects.select();

// Memoized selector to get normalized projects + pagination
export const selectProjectsData = createSelector(
  selectProjectsResult,
  (projectsResult) => projectsResult?.data ?? initialState
);

// Export entity adapter selectors
const projectSelectors = projectAdapter.getSelectors((state) => 
  selectProjectsData(state) ?? projectAdapter.getInitialState()
);

export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectSelectors;

// Custom selector to get pagination state
export const selectProjectsPagination = createSelector(
  selectProjectsData,
  (data) => data?.pagination ?? initialState.pagination
);