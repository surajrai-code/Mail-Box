import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Auth-slice'
import mailReducer from './emailSlice'

const store = configureStore({
    reducer :{auth : authReducer , mail : mailReducer}
})

export default store