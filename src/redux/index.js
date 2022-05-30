import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import admin from "./admin";

const store = configureStore ({
    reducer:{
        auth : auth.reducer,
        admin : admin.reducer
    }
})

export default store