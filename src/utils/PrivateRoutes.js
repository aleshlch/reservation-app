import { Outlet, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from "../store/toolkit/userReducer"
import { useState } from 'react'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from '../firebase'
import Loader from '../components/Loader'


const PrivateRoutes = () => {
    
    const dispatch = useDispatch()

    const [authStatus, setAuthStatus] = useState()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setUser({
                email: user.email,
                token: user.accessToken,
                id: user.uid,
                name: user.displayName
            }))
            setAuthStatus(true)
        } else {
            setAuthStatus(false)
        }
    })
    


    if ( authStatus === undefined)  {
        return <Loader />
    } else if (authStatus) {
        return ( <Outlet/> ) 
    } else if (!authStatus) {
        return <Navigate to="/login"/>
    }

}

export default PrivateRoutes