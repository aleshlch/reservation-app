import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { deleteMyReservs, deleteReserv } from "../../store/toolkit/myReservsReducer"
import { dateFormatter } from "../../utils/dateFormatter"

import './_style.scss'



const Reservs = ({reservs}) => {

    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteMyReservs(id))
        dispatch(deleteReserv({id}))
    }

    return (  
       <div>
           { reservs.map((reserv) => (
                <div className="main-reserv__card glass" key={reserv.id}>
                    <h4 className="main-reserv__title">{dateFormatter(reserv.date, '.')}</h4>
                    <p className="main-reserv__text">Time: {reserv.time.from.hours}:{reserv.time.from.minutes} - {reserv.time.to.hours}:{reserv.time.to.minutes}</p>
                    <p className="main-reserv__text">Amount: {reserv.amount} person{reserv.amount > 1 ? 's' : ''}</p>
                    <p className="main-reserv__text">Table: number {reserv.table}</p>
                    {reserv.editable ? <div className="main-reserv__btns">
                        <Link className="main-reserv__btn btn btn-outlined" to={`/newreserv/${reserv.id}`} >EDIT</Link>
                        <button className="main-reserv__btn btn btn-outlined" onClick={() => {handleDelete(reserv.id)}}>DELETE</button >
                    </div> : ''}
                </div>
            ))}
       </div>
    )
}
 
export default Reservs