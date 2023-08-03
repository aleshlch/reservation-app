import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail } from "firebase/auth"
import { auth } from '../../firebase'
import { setName, setEmail } from '../../store/toolkit/userReducer'
import Input from '../../components/Input'
import { validate } from "../../utils/validate"

import './_style.scss'

const EditProfile = () => {

    const userInfo = useSelector((state) => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [info, setInfo] = useState({
        name: userInfo.name,
        email: userInfo.email,
        currPassword: '',
        password: '',
    })

    const onChange = (e) => {
        setInfo({ ...info, [e.target.id]: e.target.value })
    }

    const [errors, setErrors] = useState({ name: false, email: false, password: false, currPassword: false})
    const [loading, setLoading] = useState(false)


    const saveData = (e) => {
        e.preventDefault()
        const valid = validate({email: info.email, password: info.password, name: info.name, currPassword: info.currPassword})

        if(info.name !== userInfo.name) {
            setErrors({...valid, email: false, password: false, currPassword: false})
            if(!valid.name) {
                setLoading(true)
                updateProfile(auth.currentUser, { displayName: info.name }).then(() => {
                    const name = info.name
                    dispatch(setName({name}))
                }).then(() => {
                    setLoading(false)  
                })
            }
        }

        if(info.email !== userInfo.email || info.password) {
            const email = info.email

            if(info.currPassword) {
                const credential = EmailAuthProvider.credential(userInfo.email, info.currPassword)
                reauthenticateWithCredential(auth.currentUser, credential). then(() => {
                    if(info.password && email !== userInfo.email) {
                        setErrors(valid)
                        if(!valid.password && !valid.email) {
                            setLoading(true)
                            updateEmail(auth.currentUser, email).then(() => {
                                dispatch(setEmail({email}))
                                updatePassword(auth.currentUser, info.password).then(() => {
                                    setLoading(false)
                                    navigate('/')  
                                })
                            }) 
                        }
                    } else if(email !== userInfo.email) {
                        setErrors({...valid, password: false})

                        if(!valid.email) {
                            setLoading(true)
                            updateEmail(auth.currentUser, email).then(() => {
                                dispatch(setEmail({email}))
                                setLoading(false)
                                navigate('/')  
                            }) 
                        }
                    } else if (info.password) {
                        setErrors(valid)

                        if(!valid.password) {
                            setLoading(true)
                            updatePassword(auth.currentUser, info.password).then(() => {
                                setLoading(false)  
                                navigate('/')
                            })  
                        }
                    } 
                }).catch((error) => {
                    const errorCode = error.code;
                    if(errorCode == 'auth/wrong-password') {
                        setErrors({...valid, currPassword: true, password: false})
                    }
                })
            } else {
                if(info.password) {
                    setErrors(valid)
                } else {
                    setErrors({...valid, password: false})
                }
                
            }   
        }
    }

    const inputs = [
        {
            id: "name",
            type: "text" ,
            placeholder: "Name",
            errorMessage: 'Enter correct value',
            label: 'Name'
        },
        {
            id: "email",
            type: "email" ,
            placeholder: "Email",
            errorMessage: 'Enter correct value',
            label: 'Email'
        },
        {
            id: "currPassword",
            type: "password",
            placeholder: "Current password",
            errorMessage: 'If you want to save change, please enter your correct current password',
            label: 'Enter your current password'
        },
        {
            id: "password",
            type: "password",
            placeholder: "New password",
            errorMessage: 'Password should be more than 6 characters',
            label: 'Set new password'
        },
    ]

    return (  
        <form className="edit__wrapper" onSubmit={(e) => {saveData(e)}}>
            <div className="edit__card glass">

                <h3 className="edit__title title">Profile info</h3>

                {inputs.map((input) => (
                        <Input key={input.id}
                        {...input}
                        value={info[input.id]}
                        onChange={onChange}
                        errors={errors}
                        />
                ))}


                <div className="edit__btns">
                    <Link className="edit__btn btn-cancel" to='/'>Cancel</Link>
                    <button className="edit__btn btn btn-filled" disabled={loading}>{loading ? 'LOADING' : 'SAVE'}</button> 
                </div>
            </div>
        </form>
    )
}
 
export default EditProfile