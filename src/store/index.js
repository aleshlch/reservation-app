import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./toolkit/userReducer"
import reservReducer from "./toolkit/reservReducer"
import myReservsReducer from "./toolkit/myReservsReducer"
import dataRef from "./toolkit/dataRef"

const rootReducer = combineReducers({
	user: userReducer,
    reserv: reservReducer,
    myReserv: myReservsReducer,
    dataRef: dataRef
})

export const store = configureStore({
    reducer: rootReducer,
})