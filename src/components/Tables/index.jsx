import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTable } from '../../store/toolkit/reservReducer'
import Modal from '../Modal'
import { dbTables } from '../../firebase'
import { ref, onValue } from "firebase/database"
import { dateFormatter } from '../../utils/dateFormatter'
import Loader from '../Loader'


import './_style.scss'





const Tables = () => {

    const [modalShow, setModalShow] = useState(false)
    const [modalInfo, setModalInfo] = useState('')
    const [loading, setLoading] = useState(true)
    const [warning, setWarning] = useState(null)

    const showModal = (number, seats) => {    
        dispatch(setTable({table: number}))   
        setModalShow(!modalShow)
        setModalInfo({
            number: number,
            seats: seats,
            closeModal: setModalShow
        })
    }

    const showWarning = (number) => {
        setWarning(number)
        setTimeout(() => {
                setWarning(null)  
        }, 3000)
    }

    const dispatch = useDispatch()
    const date = useSelector((state) => state.reserv.date)
    const time = useSelector((state) => state.reserv.time)

    const bookingTime = {
        start: `${time.from.hours}:${time.from.minutes}`,
        end: `${time.to.hours}:${time.to.minutes}`
    }

    const [currTables, setCurrTables] = useState([])

    useEffect(() => {
        onValue(ref(dbTables, 'tables'), (snapshot) => {
            setLoading(false)
            const data = snapshot.val()
            if(data !== null) {
                setCurrTables(data)
            }
        })
        
    }, [])


    const markup = currTables.map((table) => {

        const existingBookings = []

        if(table.reservations) {
            const dateKey = dateFormatter(date, '-')

            if(table.reservations[dateKey]) {
                const result = Object.keys(table.reservations[dateKey])
                result.forEach((item) => {
                    const time = item.split('-')
                    const bookingTime = { start: time[0], end: time[1] }
                    existingBookings.push(bookingTime)
                })
            }
        }

        let available

        if (existingBookings !== []) {
            const isAvailable = (booking) => {
                for (let i = 0; i < existingBookings.length; i++) {
                    const existingBooking = existingBookings[i]
                    const existingStart = new Date(`2023-01-01 ${existingBooking.start}`)
                    const existingEnd = new Date(`2023-01-01 ${existingBooking.end}`)
                    const bookingStart = new Date(`2023-01-01 ${booking.start}`)
                    const bookingEnd = new Date(`2023-01-01 ${booking.end}`)
                
                    if (
                        (bookingStart >= existingStart && bookingStart < existingEnd) ||
                        (bookingEnd > existingStart && bookingEnd <= existingEnd) ||
                        (bookingStart <= existingStart && bookingEnd >= existingEnd)
                    ) {
                        return false
                    }
                }
            
                return true
            }
    
            available = isAvailable(bookingTime)
        } else {
            available = true
        }

        

        let columns = table.seats / 2
        let rows = 2
        let widthTable = '30vh'
        let heightTable = '60%'
        let margin = '0 5%'


        if (table.seats < 4) {
            widthTable = '20vh'
        }
        if (table.seats > 4) {
            columns = (table.seats / 2 ) + 1
            widthTable = '80%'
            margin = '0'
        }
        if (table.seats >= 8) {
            columns = 2
            rows = (table.seats / 2 ) + 1
            margin = '5% 0'
            widthTable = '60%'
            heightTable = '85%'
        }

        
        const seatsMarkup = []

        for(let i=0; i < table.seats; i++) {
            let html = <div className="seat" key={i}></div>

            if (table.seats > 4 && table.seats < 7) {
                if(i == table.seats - 1) {
                    html = <div className="seat" key={i} style={{gridColumn: `${columns} / -1`, gridRow: '1 / -1'}}></div>
                }
                if(i == table.seats - 2) {
                    html = <div className="seat" key={i} style={{gridColumn:'1 / 2', gridRow: '1 / -1'}}></div>
                }
            }
            if (table.seats > 7) {
                if(i == table.seats - 1) {
                    html = <div className="seat" key={i} style={{gridColumn: `1 / -1`, gridRow: '1 / 2'}}></div>
                }
                if(i == table.seats - 2) {
                    html = <div className="seat" key={i} style={{gridColumn:'1 / -1', gridRow: `${rows} / -1`}}></div>
                }
            }

        seatsMarkup.push(html)
    }

        const number = `${table.number}`
        

        return <div className={`table ${available ? 'table-available' : ''}`}
                    key={`table${table.number}`} 
                    style={{margin: `${margin}`}} 
                    onClick={() => {available ? showModal(table.number, table.seats) : showWarning(table.number) }}>
                    <div className={`text-not-avail ${table.number == warning ? 'text-not-avail--active' : ''}`}>This table isn't available for select</div> 
                    <div className=" seats__wrapper" style={{gridTemplateColumns: `repeat(${columns}, minmax(5vh, 10vh)`, 
                                                            gridTemplateRows: `repeat(${rows}, minmax(5vh, 10vh)`, 
                                                            '--before-content': `"${number}"`,
                                                            '--width': `${widthTable}`,
                                                            '--height': `${heightTable}`}}>                                       
                        {seatsMarkup}
                    </div>
                </div>
    })



    return (  
        <>
            {loading && <Loader/>}
            <div className='tables'>
                <div className="tables__wrapper">
                            {currTables !==[] ? markup : ''}
                </div>
                {modalShow ? <Modal number={modalInfo.number} seats={modalInfo.seats} closeModal={modalInfo.closeModal}/> : ''}
            </div>
        </>
    )
}
 
export default Tables
