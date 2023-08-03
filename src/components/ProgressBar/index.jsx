import './_style.scss'

const ProgressBar = ({page}) => {

    const reservText = ['Date', 'Time', 'Table']

    const reservMarkup = []

    for (let i = 0; i < 3; i++) {
        reservMarkup.push(<div className={`row__block ${i == page ? 'row__block--active' : ''}`} key={reservText[i]}>
                            <p className="circle reserv__number">{i + 1}</p>
                            <p className="reserv__text">{reservText[i]}</p>
                        </div>)
    }
    
    return (  
        <div className="reserv__wrapper">
            <h2 className="reserv__title title">Select</h2>
            <div className="reserv__row">
                {reservMarkup}
            </div>
        </div>
    )
}
 
export default ProgressBar