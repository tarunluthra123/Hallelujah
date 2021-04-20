import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileImage: null,
        name: null,
        phoneNumber: null,
        loaded: false,
        username: null,
    },
    reducers: {
        clear: (state) => {
            for (const key in state) {
                if (state.hasOwnProperty(key)) state[key] = null;
            }
            state.loaded = false;
        },
        set: (state, action) => {
            state.profileImage = action.payload.profileImage;
            state.name = action.payload.name;
            state.phoneNumber = action.payload.phoneNumber;
            state.loaded = true;
            state.username = action.payload.username;
        },
    },
});

export const { clear, set } = profileSlice.actions;

export default profileSlice.reducer;
