import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getMyReservs } from "../../store/toolkit/myReservsReducer"
import Loader from "../../components/Loader"
import Reservs from "../../components/Reservs"

import './_style.scss'

const Archive = () => {
    
    const dispatch = useDispatch()

    const reservs = useSelector((state) => state.myReserv)

    useEffect(() => {
        dispatch(getMyReservs())
     }, [])


    return (  
        <>
            {reservs.status == 'loading' && <Loader/>}
            <div className="archive__wrapper">
                    <h2 className="archive__title title">Archive bookings</h2>
                    {reservs.myReserv.archive.length < 1 ? '' : <Reservs reservs={reservs.myReserv.archive}/>}
            </div>
        </>
    )
}
 
export default Archive