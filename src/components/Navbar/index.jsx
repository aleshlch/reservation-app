import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from "firebase/auth"
import { auth } from '../../firebase'
import { removeUser } from '../../store/toolkit/userReducer'
import { useDispatch, useSelector } from 'react-redux'


import './_style.scss'
import useOutsideClick from '../../hooks/useOutsideClick'


const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const closeDropdown = () => {
        setDropdownOpen(false)
    }

    const ref = useRef(null)

    useOutsideClick(ref, closeDropdown)

    const dispatch = useDispatch()

    const userName = useSelector((state) => state.user.name)

    const listItem = [
        {
            text: 'My Bookings',
            path: '/'
        }, 
        {
            text: 'New Reservation',
            path: '/newreserv'
        },{
            text: 'Archive',
            path: '/archive'
        },
    ]

    const listItemMarkup = listItem.map((item) => {
            return (
                <li className="list-item" key={item.text} onClick={() => {setMenuOpen(false)}}><Link to={item.path}>{item.text}</Link></li>
            )
    })

    const logOut = () => {
        signOut(auth)
        dispatch(removeUser())
    }


    return (
        <div className="nav__row">
            <ul className={`menu__list menu__list-left ${menuOpen ? 'menu__list-left--active' : ''}`}>
                {listItemMarkup}
            </ul>
            <button className={`burger ${menuOpen ? 'burger--active' : ''}`} onClick={() => {setMenuOpen((menuOpen) => !menuOpen)}}>
                <div></div>
                <div></div>
                <div></div>
            </button>
            <ul className="menu__list menu__list-right">
                <div className="text-white">{userName}</div>
                <div ref={ref} className={`menu__dropdown list-item  ${dropdownOpen ? 'menu__dropdown--active' : ''}`} onClick={() => {setDropdownOpen((dropdownOpen) => !dropdownOpen)}}>
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <i className=" fa fa-chevron-down"></i>
                        <ul className="menu__sublist sublist">
                            <div className='sublist__wrapper'>
                                <li className="sublist-item"><Link to="/edit-profile">Edit profile</Link></li>
                                <li className="sublist-item" onClick={logOut}><Link>Logout</Link></li>
                            </div>
                        </ul>
                </div>

            </ul>
        </div>

    )
}
 
export default Navbar