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
// Book interview function 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //Counts remaining spots for interview
    const dayOfInterview = state.days.findIndex(day => day.appointments.includes(id))
    const day = {
      ...state.days[dayOfInterview],
      spots: state.days[dayOfInterview].spots - 1
    }
    const days = [...state.days]
    days.splice(dayOfInterview, 1, day)

    return axios.put(`/api/appointments/${id}`, { ...appointment })
      .then(() => {
        return setState({ ...state, appointments, days })
      });
  };
  //Delete interview function
  function cancelInterview(id) {
    //Counts remaining spots for interview after delete
    const dayOfInterview = state.days.findIndex(day => day.appointments.includes(id));
    const day = {
      ...state.days[dayOfInterview],
      spots: state.days[dayOfInterview].spots + 1
    };
    const days = [...state.days]
    days.splice(dayOfInterview, 1, day);

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
        setState({ ...state, appointments, days })
      })
  };
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
