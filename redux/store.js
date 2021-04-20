import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import profileReducer from "./profile";

export default configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
    },
});
