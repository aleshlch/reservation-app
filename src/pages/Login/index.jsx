import { useDispatch } from "react-redux"
import { setUser } from "../../store/toolkit/userReducer"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase"
import Form from "../../components/Form"
import { useState } from "react"


const SignIn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({ email: false, password: false})


    const handleLogin = (e, email, password) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            dispatch(setUser({
                email: res.user.email,
                token: res.user.accessToken,
                id: res.user.uid,
                name: res.user.displayName
            }))
        })
        .then(() => {
            navigate('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode == 'auth/user-not-found') {
                setErrors({ email: true, password: false })
            } else if(errorCode == 'auth/wrong-password') {
                setErrors({ email: false, password: true })
            } 
        })

    }

    return (  
        <Form title = 'Sign in' 
        subtitle = 'Please enter your login and password!'
        btnText = 'Login'
        question = 'Do not have an account?'
        path = '/register'
        linkText = 'Register here'
        handleForm = {handleLogin}
        errors = {errors}
        />
    )

}
 
export default SignIn