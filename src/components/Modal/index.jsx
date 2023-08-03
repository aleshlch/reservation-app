import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComment, setAmount } from '../../store/toolkit/reservReducer'
import { doc, setDoc, updateDoc } from "firebase/firestore"
import { db, auth, dbTables } from '../../firebase'
import { uid } from 'uid'
import { useNavigate, useParams } from 'react-router-dom'
import { ref, set, remove } from "firebase/database"
import { dateFormatter } from '../../utils/dateFormatter'
import useOutsideClick from '../../hooks/useOutsideClick'


import './_style.scss'
import styles from '../../App/_base.scss'




const Modal = ({number, seats, closeModal}) => {

    const {id} = useParams()

    const navigate = useNavigate()

    const [comment, setCommentOpen] = useState(false)
    const [warning, setWarning] = useState(false)
    const [loading, setLoading] = useState(false)

    const reserv = useSelector((state) => state.reserv)

    const time = useSelector((state) => state.reserv.time.from)
    const amount = useSelector((state) => state.reserv.amount)
    const path = useSelector((state) => state.dataRef.dataRef)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAmount({amount: seats}))
        dispatch(setComment({ comment: null}))
    }, [])

    const modalRef = useRef()

    useOutsideClick(modalRef, closeModal)

    const disabledSelection = () => {
        setWarning(true)
        setTimeout(() => {
            setWarning(false)
        }, 3000)
    }

    const personsMarkup = []

    for (let i = 1; i < 11; i++) {

        const activeStyles = i <= amount ? ['fa-solid', styles.yellow, 'auto'] : ['fa-regular', styles.white, 'none']
        
        personsMarkup.push(
            <div className="amount__icon" onClick={i <= seats ? () => {dispatch(setAmount({amount: i}))} : disabledSelection} key={i}>
                <i className={`fa-user ${activeStyles[0]}`} style={{color: activeStyles[1]}}></i>
                <p className="amount__number" style={{color: activeStyles[1]}}>{i == 10 ? '10+' : i}</p>
            </div>
        )
    }



    const sendToDataBase = async (e) => {
        e.preventDefault()
        setLoading(true)
        const timeFrom = `${reserv.time.from.hours}:${reserv.time.from.minutes}`
        const timeTo = `${reserv.time.to.hours}:${reserv.time.to.minutes}`
        const uidd = uid()


        if (id) {
            await updateDoc(doc(db, `${auth.currentUser.uid}`, `${id}`), {
                ...reserv
            })
            await remove(ref(dbTables, path))   
        } else {
            await setDoc(doc(db, `${auth.currentUser.uid}`, `${uidd}`), {
                id: uidd,
                ...reserv
            })
        }

        const date = dateFormatter(reserv.date, '-')

        await set(ref(dbTables, 'tables/' + reserv.table + '/reservations/' + date + '/' + timeFrom + '-' + timeTo), {
            userName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            amount: amount,
            comment: comment
        })

        setLoading(false)
        navigate('/')
    }

    return (  
        <div className='modal__wrapper'>
            <form className='modal__card glass' ref={modalRef} onSubmit={(e) => {sendToDataBase(e)}}>
                <h2 className="modal__title">Table {number}</h2>
                <button className='close-btn' onClick={() => {closeModal(false)}}></button>
                <div className='modal__info'>
                    <div className="modal__block">
                        <p className="modal__block-text">Date</p>
                        <p className="modal__block-value">{dateFormatter(reserv.date, '.')}<span className="fa fa-calendar" aria-hidden="true"></span></p>
                    </div>
                    <div className="modal__block">
                        <p className="modal__block-text">Time</p>
                        <p className="modal__block-value">{`${time.hours}:${time.minutes}`} <span className="fa-solid fa-clock"></span></p>
                    </div>
                </div>
                <div className="amount">
                    <p className="amount__text">Select the number of persons</p>
                    <div className='amount__icon-wrapper'>
                        {personsMarkup}
                    </div>
                    <p className="amount__warning" style={{opacity: warning ? '1' : '0'}}>Number more than available seats</p>
                </div>
                <button type="button" className="modal__comment" onClick={() => {setCommentOpen((comment) => !comment)}}>+ add comment</button>
                {comment ? <textarea  rows="3" className="modal__text" onChange={(e) => {dispatch(setComment({ comment: e.target.value}))}}/> : ''}
                <button className="modal__btn btn btn-filled" disabled={loading}>{loading ? 'Loading' : 'Make reservation'}</button>
            </form>
        </div>
    )
}
 
export default Modal