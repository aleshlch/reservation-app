import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setDate, updateDate } from '../../store/toolkit/reservReducer'
import { useParams  } from "react-router-dom"

import './_style.scss'

const Calendar = () => {

    let dateSelected

    let date = new Date()

    const currDate = useSelector((state) => state.reserv.date)
    const utcDate = new Date(currDate.year, currDate.month - 1, currDate.day)

    const {id} = useParams()

    if (id) {
      dateSelected = utcDate
    } else {
      dateSelected = date
    }

    const [selectedDate, setSelectedDate] = useState(dateSelected)


    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const dispatch = useDispatch()

    useEffect(() => {
      if((currDate.month < 1 && currDate.month !== null) || (currDate.month > 12 && currDate.month !== null)) {
        date = new Date(currDate.year, currDate.month - 1, new Date().getDate())
        dispatch(updateDate({ key: 'year', value: date.getFullYear() }))
        dispatch(updateDate({ key: 'month', value: date.getMonth() + 1 }))
      }
    }, [currDate.month])

    useEffect(() => {
      if(!id) {
        dispatch(setDate({
          day: date.getDate(), 
          month: date.getMonth() + 1, 
          year: date.getFullYear()
        }))
      }
    }, [])

    const handleClick = (currdate, i) => {
      dispatch(updateDate({ key: 'day', value: i }))
      setSelectedDate(currdate)
    }

    let daysOfMonth = []

    const renderCalendar = () => {   
      let firstDayofMonth = new Date(currDate.year, currDate.month - 1, 1).getDay()
      let lastDateofMonth = new Date(currDate.year, currDate.month, 0).getDate()
      let lastDayofMonth = new Date(currDate.year, currDate.month - 1, lastDateofMonth).getDay()
      let lastDateofLastMonth = new Date(currDate.year, currDate.month - 1, 0).getDate()


      for (let i = firstDayofMonth; i > 0; i--) { 
        daysOfMonth.push(<li key={`last${i}`} className="date-inactive">{lastDateofLastMonth - i + 1}</li>)
      }

      for (let i = 1; i <= lastDateofMonth; i++) { 
        const currdate = new Date(currDate.year, currDate.month - 1, i)

        daysOfMonth.push(<li key={`curr${i}`} className={ selectedDate.toString().slice(0, 16) == currdate.toString().slice(0, 16) ? 'date-active' : ''}  
                                                  onClick={() => {handleClick(currdate, i)}}>{i}</li>)
      }

      for (let i = lastDayofMonth; i < 6; i++) {
          daysOfMonth.push(<li key={`next${i}`} className="date-inactive">{i - lastDayofMonth + 1}</li>)
      }
    }


    renderCalendar()
    

    return (  
        <div className="calendar__card glass">
          <div className="calendar__title">
            <p className="calendar__curr-date">{months[currDate.month]} {currDate.year}</p>
            <div className="calendar__icons">
              <i id="prev" className="fa-solid fa-chevron-left" onClick={() => {dispatch(updateDate({ key: 'month', value: currDate.month - 1 }))}}></i>
              <i id="next" className="fa-solid fa-chevron-right" onClick={() => {dispatch(updateDate({ key: 'month', value: currDate.month + 1 }))}}></i>
            </div>
          </div>
          <div className="calendar">
            <ul className="weeks">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul className="days">
              {daysOfMonth}
            </ul>
          </div>
      </div>
    )
}
 
export default Calendar