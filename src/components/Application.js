import React, { useState, useEffect }  from "react";
import axios from 'axios';
import DayList from 'components/DayList.js';
import "components/Application.scss";

import Appointment from   "./Appointment/index";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Clara Jones",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Jane Smith",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 6,
    time: "5pm",
    interview: {
      student: "Dan Wats",
      interviewer: {
        id: 5,
        name: "Sven Roy",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];

export default function Application(props) {

  const [day, setDay] = useState( "Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get("/api/days")
      .then((response) => {
        console.log(response.data);
        // setLoading(false);
        setDays(response.data);
      });
  }, []);
  
  const listOfAppointments = appointments.map((appointment) =>
    <Appointment key={appointment.id}
      id={appointment.id}
      interview = {appointment.interview}
      time={appointment.time}
      />
  );

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
            days={days}
            day={day}
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
