import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { social_networkSlice } from './social_network';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        social_network: social_networkSlice.reducer
    },
});