import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
    name : "auth",
    initialState : {isLogin : true, user:{}},
    reducers : {
        login(state){
            state.isLogin = true
        },
        logout(state){
            state.isLogin = false
        }
    }
})

export const authActions = auth.actions
export default auth