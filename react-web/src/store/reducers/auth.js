import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState:{
        isLoggedIn: false,
        token: null,
        userInfor: {}
    },
    reducers:{
        login: (state,action)=>{
            state.isLoggedIn =  true;
            state.token = action.payload.token;
            state.userInfor = action.payload.userInfor;
        },
        logout:(state)=>{
            state.isLoggedIn = false;
            state.token = null;
            state.userInfor = {};
        }
    }
})
export const { login, logout} = authSlice.actions;
export default authSlice.reducer;