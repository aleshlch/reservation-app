import ProgressBar from "../../components/ProgressBar"
import Calendar from "../../components/Calendar"
import Time from "../../components/Time"
import Tables from "../../components/Tables"
import { useEffect, useState } from "react"
import { useNavigate, useParams  } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db, auth } from '../../firebase'
import { setTime, setDate } from '../../store/toolkit/reservReducer'
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
import { setDataRef } from "../../store/toolkit/dataRef"
import { dateFormatter } from "../../utils/dateFormatter"

import './_style.scss'



const NewReserv = () => {

    const {id} = useParams()

    const [loading, setLoading] = useState(id)
    const time = useSelector((state) => state.reserv.time)
    const timeArr= [time.from.hours, time.from.minutes, time.to.hours, time.to.minutes]
    const [invalid, setInvalid] = useState([])

    const dispatch = useDispatch()

    const getItemInfo = async () => {
        const docSnap = await getDoc(doc(db, `${auth.currentUser.uid}`, `${id}`))
        if (docSnap.exists()) {
            const date = docSnap.data().date
            const time = docSnap.data().time
            dispatch(setDate(date))
            dispatch(setTime(time))
            const dataRef = 'tables/' + docSnap.data().table + '/reservations/' + dateFormatter(date, '-') + '/' + `${time.from.hours}:${time.from.minutes}` + '-' + `${time.to.hours}:${time.to.minutes}`
            dispatch(setDataRef({dataRef}))
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            getItemInfo()
        }
    }, [])

    const [page, setPage] = useState(0)

    const pages = [<Calendar/>, <Time invalid={invalid}/>, <Tables />]

    const navigate = useNavigate()

    const btns = () => {

        const nextPage = () => {
            if(page == 1) {
                const errors = [] 
                timeArr.forEach((itemTime, index) => {
                    if(!itemTime) {
                        errors.push(index + 1)
                    }
                })

                setInvalid(errors)

                if(errors.length == 0) {
                    setPage(page + 1)
                }

            } else if(page !== 1) {
                setPage(page + 1)
            }
        }


        return (
            <div className="new-reserv__btns">
                <button className="new-reserv__btn btn btn-outlined" onClick={() => {setPage(page - 1)}}>Prev</button>
                <button className="new-reserv__btn btn btn-outlined" onClick={nextPage}>Next</button >
            </div>
        )
    }

    if (loading) {
        return <Loader />
    } else {
        return ( 
            <div>
                <ProgressBar page={page}/>
                {page == -1 ? navigate('/') : pages[page]}
                {page == 2 ? '' : btns()}
            </div>
        )
    }
}
 
export default NewReserv