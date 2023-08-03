import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    dataRef: ''
}

const dataRefSlice = createSlice({
    name: 'dataRef',
    initialState,
    reducers: {
        setDataRef(state, action) {
            state.dataRef = action.payload.dataRef
        },
    },
})

export const {setDataRef} = dataRefSlice.actions

export default dataRefSlice.reducer
