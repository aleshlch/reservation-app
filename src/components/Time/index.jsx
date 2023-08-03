import { useRef, useState} from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTime } from '../../store/toolkit/reservReducer'
import useOutsideClick from '../../hooks/useOutsideClick'

import './_style.scss'



const Time = ({invalid}) => {

    const [dropdown, setDropdown] = useState(null)

    const time = useSelector((state) => state.reserv.time)

    const dispatch = useDispatch()

    const hours = []
    const minutes = []
    const hoursTo = []
    const minutesTo = []


    const closeDropdown = () => {
        setDropdown(null)
    }


    const handleClickNumber = (key, value, range) => {
        dispatch(updateTime({ range: range, key: key, value: value}))
        closeDropdown()
    }

    for (let i = 12; i < 24; i++) {
        hours.push(<div className="sublist__number" key={i}  onClick={() => {handleClickNumber('hours', i, 'from')}}>{i}</div>)
    }

    for (let i = 0; i < 60; i++) {
        let value = i < 10 ? `0${i}` : i
        minutes.push(<div className="sublist__number" key={i}  onClick={() => {handleClickNumber('minutes', value, 'from')}}>{value}</div>)
    }

    for (let i = 12; i < 24; i++) {
        hoursTo.push(<div className="sublist__number" key={i}  onClick={() => {handleClickNumber('hours', i, 'to')}}>{i}</div>)
    }

    for (let i = 0; i < 60; i++) {
        let value = i < 10 ? `0${i}` : i
        minutesTo.push(<div className="sublist__number" key={i}  onClick={() => {handleClickNumber('minutes', value, 'to')}}>{value}</div>)
    }


    const dropdownMarkup = []

    const dropdownRef = useRef()

    for (let i = 1; i < 5; i++) {

        const condition = i % 2 == 0

        const invalidValue = invalid.includes(i)

        dropdownMarkup.push(
            <div className='time__dropdown'>
                <input type="text" 
                        className={`time__input ${invalidValue ? 'time-invalid' : ''}`}
                        placeholder={condition ? 'MM' : 'HH'} 
                        value={i < 3 ? time.from[condition ? 'minutes' : 'hours'] : time.to[condition ? 'minutes' : 'hours']} 
                        readOnly id={i} 
                        onClick={() => {setDropdown(i)}}/>
                <div className={`sublist time__sublist ${i == dropdown ? 'time__sublist--active' : ''}`}>
                    <div className="sublist__number-wrapper" >{i < 3 ? (condition ? minutes : hours) : (condition ? minutesTo : hoursTo)}</div>
                </div>
            </div>
        )
    }

    useOutsideClick(dropdownRef, closeDropdown)

    return ( 
        <div className='time'>
            <h3 className="time__title">Time available for selection from 12:00 to 23:59</h3>
            <div className='time__inner' ref={dropdownRef}>
                <div className='time__wrapper'>
                    <p className="time__text">From</p>
                    <div className='time__block'>
                        {dropdownMarkup[0]}
                        <p className="time__separator">:</p>
                        {dropdownMarkup[1]}
                    </div>
                </div>
                <div className='time__wrapper'>
                    <p className="time__text">To</p>
                    <div className='time__block'>
                        {dropdownMarkup[2]}
                        <p className="time__separator">:</p>
                        {dropdownMarkup[3]}
                    </div>
                </div>
            </div>
        </div>
     )
}
 
export default Time