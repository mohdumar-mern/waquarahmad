import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Adapter setup
const projectAdapter = createEntityAdapter();
const initialState = projectAdapter.getInitialState();

// ✅ API slice injection
export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const projects = responseData.data || responseData; // fallback if API doesn't wrap in data

        if (!Array.isArray(projects)) {
          console.error("❌ Unexpected projects format:", projects);
          return initialState;
        }

        const loadedProjects = projects.map((project) => ({
          ...project,
          id: project._id,
        }));

        return projectAdapter.setAll(initialState, loadedProjects);
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
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: builder.mutation({
      query: ({id, body}) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (
        result,
        error,
        arg
      ) => {
        if (error) {
          console.error("❌ Failed to update project:", error);
          return [];
        }
        return [{ type: "Project", id: arg.id }];
      },
    }),

  }),
});

export const { useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation
 } = projectApiSlice;

// Selector to get raw result (status, data, etc.)
export const selectProjectsResult =
  projectApiSlice.endpoints.getProjects.select();

// ✅ Create memoized selector for normalized data
const selectProjectsData = createSelector(
  selectProjectsResult,
  (projectsResult) => projectsResult?.data ?? initialState
);

// ✅ Export selectors from adapter
export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectAdapter.getSelectors(
  (state) => selectProjectsData(state)
);
