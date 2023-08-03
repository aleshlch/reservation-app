import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { auth, db } from "../../firebase"
import { dateFormatter } from "../../utils/dateFormatter"


export const getMyReservs = createAsyncThunk(
    'reservs/getMyReservs',
    async function() {
        try {
            const response = await getDocs(collection(db, `${auth.currentUser.uid}`))

            const dataCurr = []
            const dataArchive = []
            response.forEach((doc) => {
                let editable

                const dateString = dateFormatter(doc.data().date, '-').split('-').reverse().join('-')
                const time = doc.data().time.from
                const date = new Date(`${dateString}T${time.hours}:${time.minutes}:00`)
                const currDate = new Date() 

                const hoursDifference = (currDate - date) / (1000 * 60 * 60)

                if(hoursDifference >= -1) {
                    editable = false
                } else {
                    editable = true
                }

                const data = {
                    ...doc.data(),
                    editable: editable
                }

                if(date < currDate) {
                    dataArchive.push(data)
                } else {
                    dataCurr.push(data)
                }
            })

    
            return {dataCurr, dataArchive}
            
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteMyReservs = createAsyncThunk(
    'reservs/deleteMyReservs',
    async function(id, {dispatch}) {
        try {

            await deleteDoc(doc(db, `${auth.currentUser.uid}`, id));

            dispatch(deleteReserv({id}))

        } catch (error) {
            console.log(error)
        }
    }
)


const myReservSlice = createSlice({
    name: 'myReserv',
    initialState: {
        myReserv: {
            currReserv: [],
            archive: []
        },
        status: null,
        error: null
    },
    reducers: {
        setMyReserv(state, action) {
            state.currReserv.push(action.payload)
            return state
        },
        deleteReserv(state, action) {
            state.myReserv.currReserv = state.myReserv.currReserv.filter(reserv => reserv.id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMyReservs.fulfilled, (state, action) => {
          state.status = 'resolved'
          state.myReserv.currReserv = action.payload.dataCurr
          state.myReserv.archive = action.payload.dataArchive
        })
        .addCase(getMyReservs.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
      },
    
})

export const { setMyReserv, deleteReserv } = myReservSlice.actions

export default myReservSlice.reducer