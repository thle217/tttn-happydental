import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: false,
    reducers: {
        setLoginOpen(state, action) {
            return action.payload;
        },
    },
});

const { actions, reducer } = loginSlice;
export const { setLoginOpen } = actions;
export default reducer;