import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {apointment: '', date: '', appointmentList: [], isFilterActive: false}

  toggleButton = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isLike: !eachAppointment.isLike}
        }
        return eachAppointment
      }),
    }))
  }

  onStarClicked = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {apointment, date} = this.state
    const formatdate = date ? format(new Date(date), 'dd MMMM YYYY, EEEE') : ' '

    const newList = {
      id: uuidv4(),
      apointment,
      date,
      isLike: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newList],
      apointment: '',
      date: '',
    }))
  }

  onAppointment = event => {
    this.setState({apointment: event.target.value})
  }

  onDate = event => {
    this.setState({date: event.target.value})
  }

  filterAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachTransation => eachTransation.isLike === true,
      )
    }
    return appointmentList
  }

  render() {
    const {apointment, date} = this.state
    const filterAppointmentList = this.filterAppointmentList()

    return (
      <div className="main-container">
        <div className="card-container">
          <h1>Add Appointment</h1>
          <div className="horizontal-setup">
            <form onSubmit={this.onAddAppointment} className="my-form">
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                className="input"
                value={apointment}
                onChange={this.onAppointment}
                placeholder="Title"
              />
              <label htmlFor="date">DATE</label>
              <input
                id="date"
                type="date"
                value={date}
                placeholder="date"
                onChange={this.onDate}
              />
              <br />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <div>
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <div>
            <hr />
          </div>
          <div className="stars">
            <h1>Appointments</h1>
            <button
              type="button"
              onClick={this.onStarClicked}
              className="star-button"
            >
              Starred
            </button>
          </div>
          <ul>
            {filterAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleButton={this.toggleButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
