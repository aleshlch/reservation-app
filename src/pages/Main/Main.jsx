import { useEffect } from "react"
import NoReserv from "../../components/NoReserv"
import { getMyReservs } from "../../store/toolkit/myReservsReducer"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
import Reservs from "../../components/Reservs"
import { removeReserv } from "../../store/toolkit/reservReducer"


import './_style.scss'



const Main = () => {

    const dispatch = useDispatch()
    const reservs = useSelector((state) => state.myReserv)

    

    useEffect(() => {
        dispatch(removeReserv())
        dispatch(getMyReservs())
    }, [])


return (
    <>
        {reservs.status == 'loading' && <Loader/>}
        <div className="main__wrapper">
                    <h2 className="main__title title">My bookings</h2>
                    {reservs.myReserv.currReserv.length > 0 ? <Reservs reservs={reservs.myReserv.currReserv}/> : <NoReserv/> }
        </div>
    </>
)
   
}
 
export default Main