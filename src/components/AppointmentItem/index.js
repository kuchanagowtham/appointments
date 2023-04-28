const AppointmentItem = props => {
  const {appointmentDetails, toggleButton} = props

  const {id, apointment, date, isLike} = appointmentDetails
  const setStar = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starbutton = () => {
    toggleButton(id)
  }

  return (
    <li>
      <div>
        <div className="container">
          <p>{apointment}</p>
          <button type="button" onClick={starbutton}>
            <img src={setStar} alt="star" />
          </button>
        </div>
        <p>Date: {date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
