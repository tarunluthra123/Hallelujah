import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        username: null,
        userId: null,
        role: null,
        isLoggedIn: false,
    },
    reducers: {
        logout: (state) => {
            state.username = state.userId = state.role = null;
            state.isLoggedIn = false;
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.userId = action.payload.userId;
            state.role = action.payload.role;
        },
    },
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
