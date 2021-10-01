import React from "react";
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Header from 'components/Appointment/Header';

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  
   const interview = props.interview;
   return (<article className="appointment"> 
   <Header time={props.time}/>
   {props.interview ? <Show student={interview.student} interviewer={interview.interviewer.name} /> : <Empty /> } 
 
   </article>);
}
