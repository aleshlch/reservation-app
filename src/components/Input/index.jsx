import './_style.scss'

const Input = (props) => {

    const { errorMessage, errors, label, onChange, ...inputProps } = props

    return (  
        <div className='form__input'>
            <label htmlFor={`${inputProps.id}`}>{label}</label>
            <input className={`form-input ${errors[inputProps.id] ? 'invalid' : ''}`} onChange={onChange} {...inputProps}/>
            <span className='form-error' style={{display: errors[inputProps.id] ? 'inline-block' : 'none'}}>{errorMessage}</span>
        </div>
    )
}
 
export default Input