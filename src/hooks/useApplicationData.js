import axios from 'axios';
import { useState, useEffect } from "react";

const useApplicationData = function () {

  const setDay = day => setState({ ...state, day });
  
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
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      
    })
  }, []);



  // const updateSpots = (dayName) => {

  //   let daysArray = state.days;
  //   const found = daysArray.find(day => day.name === dayName);
  //   const idx = daysArray.findIndex(function (day) {
  //     return found.id === day.id;
  //   })

  //   const app = found.appointments
  //   const filtered = app.filter(appoint => state.appointments[appoint].interview === null);
    
  //   let numOfSpots = filtered.length // length of appointments

  //   const day = {
  //     ...found,
  //     spots: numOfSpots
  //   };

   

  //   const days = [...state.days ,state.days[idx] = day ];

  //   setState(prev => ({ ...prev, days: state.days }))
  //    console.log("day------------->",day );
  //       console.log("------daysArray")
  //       console.log(numOfSpots)
  //       console.log("daysArray---------")

  // };
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfInterview = state.days.findIndex(day => day.appointments.includes(id))
    const day = {...state.days[dayOfInterview], 
    spots: state.days[dayOfInterview].spots - 1 }

    const days =[...state.days]
    days.splice(dayOfInterview, 1, day)

    return axios.put(`/api/appointments/${id}`, { ...appointment })
      .then(() => {
        return setState({ ...state, appointments, days  })
      })
      
      
  }

  function cancelInterview(id) {

    const dayOfInterview = state.days.findIndex(day => day.appointments.includes(id))
    const day = {...state.days[dayOfInterview], 
    spots: state.days[dayOfInterview].spots + 1 }

    const days =[...state.days]
    days.splice(dayOfInterview, 1, day)
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        setState({ ...state, appointments, days  })
      })
      
  }
  return {state, setDay, bookInterview, cancelInterview};
}

export default useApplicationData;
