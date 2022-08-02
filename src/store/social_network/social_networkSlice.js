import { createSlice } from '@reduxjs/toolkit';

export const social_networkSlice = createSlice({
    name: 'social_network',
    initialState: {
        address: null,
        birthdate: null
    },
    
    reducers: {
        setProfileInfo: (state, action ) => {
            state.address = action.payload.address;
            state.birthdate = action.payload.birthdate;
        },
    }
});

export const { setProfileInfo } = social_networkSlice.actions;