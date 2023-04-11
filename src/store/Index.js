import { configureStore } from "@reduxjs/toolkit";
import MailSlice from "./MailSlice";
import authSlice from "./Auth"

const store = configureStore({
    reducer : {
        auth:authSlice,
        mail: MailSlice
    }
})
export default store;