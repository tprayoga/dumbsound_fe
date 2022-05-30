import { createSlice } from "@reduxjs/toolkit";

const admin = createSlice({
    name : "admin",
    initialState : {isAdmin : true},
    reducers : {
        admin(state){
            state.isAdmin = false
        }
    }
})

export const adminActions = admin.actions
export default admin