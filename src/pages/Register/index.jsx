import { useDispatch } from "react-redux"
import { setUser } from "../../store/toolkit/userReducer"
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import Form from "../../components/Form"
import { auth } from "../../firebase"
import { useState } from "react"
import { validate } from "../../utils/validate"


const SignUp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})


    const handleRegister = (e, email, password, name) => {
        e.preventDefault()
        const valid = validate({email: email, password: password, name: name})
        setErrors(valid)
        
        if(!valid.email && !valid.name && !valid.password) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    dispatch(setUser({
                        email: auth.currentUser.email,
                        token: auth.currentUser.accessToken,
                        id: auth.currentUser.uid,
                        name: auth.currentUser.displayName
                    }))
                }).then(() => {
                    navigate('/')
                })
            })
        }
    }

    



    return (  
        <Form title = 'Sign up' 
        subtitle =  'Register from here to access'
        btnText = 'Register'
        question = 'Have already an account?'
        path = '/login'
        linkText = 'Login here'
        handleForm = {handleRegister}
        errors={errors}
        />
    )
}
 
export default SignUp