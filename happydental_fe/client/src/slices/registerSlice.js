import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
    name: "register",
    initialState: false,
    reducers: {
        setRegisterOpen(state, action) {
            return action.payload;
        },
    },
});

const { actions, reducer } = registerSlice;
export const { setRegisterOpen } = actions;
export default reducer;