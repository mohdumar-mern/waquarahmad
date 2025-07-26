import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { Arapey } from "next/font/google";

const skillAdapter = createEntityAdapter({});
const initialState = skillAdapter.getInitialState();

export const skillApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => "/skills",
            validateStatus: (response, result) =>
                response.status === 200 && !result.isError,

            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const skills = responseData?.data || responseData;
                if (!Array.isArray(skills)) {
                    console.error("Unexpected skills format:", skills);
                    return initialState;
                }
                const loadedSkills = skills.map((skill) => ({
                    ...skill,
                    id: skill._id,
                }));
                return skillAdapter.setAll(initialState, loadedSkills);
            },
            providesTags: (result) =>
                result?.ids
                    ? [
                        { type: "Skill", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Skill", id })),
                    ]
                    : [{ type: "Skill", id: "LIST" }],
        }),
        addSkill: builder.mutation({
            query: (newSkill) => ({
                url: "/skills",
                method: "POST",
                body: newSkill,
            })
        }),
        updateSkill: builder.mutation({
            query: ({ id, body }) => ({
                url: `/skills/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error("Failed to update skill:", error);
                    return [];
                }
                return [{ type: "Skill", id: arg.id }];
            },
        }),
        deleteSkill: builder.mutation({
            query: (id) => ({
                url: `/skills/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error("Failed to delete skill:", error);
                    return [];
                }
                return [{ type: "Skill", id: arg }];
            },
        }),


    })
})
export const {
    useGetSkillsQuery,
    useAddSkillMutation,
    useUpdateSkillMutation,
    useDeleteSkillMutation
} = skillApiSlice;

const selectSkillsResult =
    skillApiSlice.endpoints.getSkills.select();

// Memoized normalized data selector
export const selectSkillsData = createSelector(
    [selectSkillsResult],
    (result) => result?.data
);

// Export normalized selectors
export const {
    selectAll: selectAllSkills,
    selectById: selectSkillById,
    selectIds: selectSkillIds,
} = skillAdapter.getSelectors(
    (state) => selectSkillsData(state) || initialState
);
// export const selectSkillEntities = (state) => selectSkillsData(state)?.entities || {};