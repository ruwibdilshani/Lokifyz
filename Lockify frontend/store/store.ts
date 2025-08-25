import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/user-slice"; 
import passwordReducer from "../reducer/password-slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        password : passwordReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
