
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({

    name: 'auth',

    initialState: {
        status: 'checking', //'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        name: null,
        surname: null,
        username: null,
        photoURL: null,
        created_time: null,
        errorMessage: null,  
    },

    reducers: {
        login: (state, action) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.username = action.payload.username;
            state.photoURL = action.payload.photoURL;
            state.created_time = action.payload.created_time;
            state.errorMessage = null;
        },

        logout: (state, action) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.name = null;
            state.surname = null;
            state.username = null;
            state.photoURL = null;
            state.created_time = null;
            state.errorMessage = action.payload?.errorMessage;
        },
        
        checkingCredentials: (state) => {
            state.status = 'checking';
        },

        setProfileImage: (state, action) => {
            state.photoURL = action.payload.url;
        }
    }
});

export const { login, logout, checkingCredentials, setProfileImage } = authSlice.actions;