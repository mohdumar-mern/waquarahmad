import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const profileAdapter = createEntityAdapter();

const initialState = profileAdapter.getInitialState();

// Api slice injection

export const profileApiSlic = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query({
            query: () => '/profile/',
            validateStatus: (response, result) =>
                response.status === 200 && !result.isError,
            keepUnusedDataFor: 5,

        }),
        getProfilePic: builder.query({
            query: () => '/profile/Pic',
            validateStatus: (response, result) =>
                response.status === 200 && !result.isError,
            keepUnusedDataFor: 5,

        }),
        // Get social-links
        getSocailLinks: builder.query({
            query: () => '/profile/social-links',
            validateStatus: (response, result) =>
                response.status === 200 && !result.isError,
            keepUnusedDataFor: 5,
        }),
        // Get Resume
        getResume: builder.query({
            query: () => '/profile/resume',
            validateStatus: (response, result) =>
                response.status === 200 && !result.isError,
            keepUnusedDataFor: 5,
        }),

        // Update Profile
        updateProfile: builder.mutation({
            query: (id) => ({
                url: '/profile',
                method: 'PUT',
                body: id,
            }),

            validateStatus: (response, result) =>
                response.status === 200 && !result.isError,
            keepUnusedDataFor: 5,
        }),

    })
})



export const { useGetProfilePicQuery, useGetSocailLinksQuery, useGetResumeQuery, useGetProfileQuery,useUpdateProfileMutation } = profileApiSlic;

