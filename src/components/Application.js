import React, { useState, useEffect }  from "react";
import axios from 'axios';
import DayList from 'components/DayList.js';
import { getAppointmentsForDay, getInterview ,getInterviewersForDay} from "helpers/selectors";
import "components/Application.scss";
import Appointment from   "./Appointment/index";



export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`,{ ...appointment })
        .then(() => {

          setState({ ...state, appointments })
          resolve()
        })})
  }

  function cancelInterview(id){

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          const appointment = {
            ...state.appointments[id],
            interview: null
          };
          const appointments = {
            ...state.appointments,
             [id]: appointment

          }
          setState({ ...state, appointments })
          resolve()
        })})

  }


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
    
  
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })

    console.log("interviewers----------", state.interviewers)

  }, []);

  const dailyAppointments  = getAppointmentsForDay(state, state.day);
  const listOfAppointments= dailyAppointments.map((appointment) =>{

    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    console.log("interv------",interview)
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      
        interviewers = {interviewers}
        bookInterview = {bookInterview}
        cancelInterview ={cancelInterview}
        
       
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {listOfAppointments}
      <Appointment key="last" time="6pm" />
     
      </section>
    </main>
  );
}
