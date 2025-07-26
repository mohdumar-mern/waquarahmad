import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const contactAdapter = createEntityAdapter();
const initialState = contactAdapter.getInitialState();

export const contactApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getContacts: builder.query({
  query: ({ page = 1, limit = 10, search = "" } = {}) =>
    `/contacts?page=${page}&limit=${limit}&search=${search}`,

  validateStatus: (response, result) => {
    return response.status === 200 && !result?.isError;
  },

  keepUnusedDataFor: 5,

  transformResponse: (responseData) => {
    // Safely extract contacts
    const contacts = responseData?.data || [];
    
    // If not array, return initial state
    if (!Array.isArray(contacts)) {
      console.error("Unexpected contacts format:", contacts);
      return initialState;
    }

    // Adapt contacts
    const loadedContacts = contacts.map((contact) => ({
      ...contact,
      id: contact._id,
    }));

    return contactAdapter.setAll(initialState, loadedContacts);
  },

  providesTags: (result, error, arg) => {
    if (result?.ids) {
      return [
        { type: "Contact", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Contact", id })),
      ];
    }
    return [{ type: "Contact", id: "LIST" }];
  },
}),

        addContact: builder.mutation({
            query: (contact) => ({
                url: "/contacts",
                method: "POST",
                body: contact,
            }),
            invalidatesTags: [{ type: "Contact", id: "LIST" }],
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Contact", id: arg }],
        }),
    })
})

export const {
    useGetContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation,
} = contactApiSlice;

export const selectContactsResult = contactApiSlice.endpoints.getContacts.select();

export const selectContacts = createSelector(
    selectContactsResult,
    (state) => state.contacts.result?.data || initialState
);

export const {
    selectAll: selectAllContacts,
    selectById: selectContactById,
    selectIds: selectContactIds,
} = contactAdapter.getSelectors((state) => selectContacts(state) || initialState);