import { Link } from "react-router-dom"

import './_style.scss'

const NoReserv = () => {
    return (  
            <div>
                <h3 className="noreserv__title title">Unfortunately, you don't have a reservation yet</h3>
                <Link className="noreserv__btn btn btn-filled" to={`/newreserv`}>+ new reservation</Link>
            </div>
    )
}
 
export default NoReserv