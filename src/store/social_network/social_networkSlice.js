import { createSlice } from '@reduxjs/toolkit';

export const social_networkSlice = createSlice({
    name: 'social_network',
    initialState: {
        address: null,
        birthdate: null,
        posts: [],
        searchedUsers: []
    },
    
    reducers: {
        setProfileInfo: (state, action ) => {
            state.address = action.payload.address;
            state.birthdate = action.payload.birthdate;
        },

        networkLogout: (state) => {
            state.address = null;
            state.birthdate = null;
            state.posts = [];
        },

        setPosts: (state, action) => {
            state.posts = action.payload;
        },

        setSearchedUsers: (state, action) => {
            state.searchedUsers = action.payload;
        }
    }
});

export const { setProfileInfo, networkLogout, setPosts, setSearchedUsers } = social_networkSlice.actions;