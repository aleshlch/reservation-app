import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../Input'

import './_style.scss'


const Form = ({title, subtitle, btnText, question, path, linkText, handleForm, errors}) => {

    const [info, setInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setInfo({ ...info, [e.target.id]: e.target.value })
    }
    

    const inputs = [
        {
            id: "email",
            type: "email" ,
            placeholder: "Email",
            errorMessage: path == '/login' ? 'Enter correct value' : 'User not found',
            
        },
        {
            id: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: path == '/login' ? 'Password should be more than 6 characters' : 'Wrong password',
        },
    ]

    if(path == '/login') {
        inputs.unshift({
            id: "name",
            type: "text" ,
            placeholder: "Name",
            errorMessage: 'Enter correct value',
        },)
    }

    return (  
        <div className='form__wrapper'>
            <form onSubmit={(e) => {handleForm(e, info.email, info.password, info.name)}} className="form__card glass" >
    
                <h3 className="form__title title">{title}</h3>
                
                <p className="form__subtitle">{subtitle}</p>

                {inputs.map((input) => (
                        <Input key={input.id}
                        label=''
                        {...input}
                        value={info[input.id]}
                        onChange={onChange}
                        errors={errors}
                        />
                ))}

                <button className="form__btn btn btn-filled">{btnText}</button>
    
                <p className="form__question">{question} <Link to={path} className="form__link">{linkText}</Link></p>
            </form>
        </div>
    )
}
 
export default Form