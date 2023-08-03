import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    date: {
        day: null, 
        month: null, 
        year: null
    },
    time: {
        from: {
            hours: '',
            minutes: ''
        },
        to: {
            hours: '',
            minutes: ''
        }
    },
    table: null,
    amount: null,
    comment: null
}


const reservSlice = createSlice({
    name: 'reserv',
    initialState,
    reducers: {
        setDate(state, action) {
            state.date.day = action.payload.day
            state.date.month = action.payload.month
            state.date.year = action.payload.year
        },
        updateDate(state, action) {
            state.date[action.payload.key] = action.payload.value
        },
        setTime(state, action) {
            state.time.from.hours = action.payload.from.hours
            state.time.from.minutes = action.payload.from.minutes
            state.time.to.hours = action.payload.to.hours
            state.time.to.minutes = action.payload.to.minutes
        },
        updateTime(state, action) {
            const { range , key, value } = action.payload
            state.time[range][key] = value
        },
        setTable(state, action) {
            state.table = action.payload.table
        },
        setAmount(state, action) {
            state.amount = action.payload.amount
        },
        setComment(state, action) {
            state.comment = action.payload.comment
        },
        removeReserv(state) {
            state.date.day = null
            state.date.month = null
            state.date.year = null
            state.time.from.hours = ''
            state.time.from.minutes = ''
            state.time.to.hours = ''
            state.time.to.minutes = ''
            state.table = null
            state.amount = null
            state.comment = null
        },
    },
})

export const {setDate, updateDate, setTime, updateTime, setTable, setAmount, setComment, removeReserv} = reservSlice.actions

export default reservSlice.reducer