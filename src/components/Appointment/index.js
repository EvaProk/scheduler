import React from "react";
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Header from 'components/Appointment/Header';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';



import Form from 'components/Appointment/Form';

import useVisualMode from 'hooks/useVisualMode';

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"

  
export default function Appointment(props) {

 


   const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);

      props.bookInterview(props.id, interview )
      .then(() => transition(SHOW));
    }

    function deleteInt(id) {
      const interview = null;
      transition(DELETING);
       props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY));
      
    }


  
   const interview = props.interview;
   return (<article className="appointment"> 
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (<Form
         interviewers={props.interviewers}
         onSave={save}
      />)}
      {mode === SAVING && (<Status message="Saving..." />)}
      {mode === CONFIRM && (
      <Confirm 
      message="Are you sure?" 
      onCancel={()=> transition(SHOW)}
      onConfirm ={deleteInt }
      />)}
      {mode === DELETING && (<Status message="DELETING..." />)}
      {mode === EDIT && (
      <Form 
      interviewers={props.interviewers} 
      onSave={save} 
      onCancel={back} 
      interviewer={interview.interviewer.id} 
      name={interview.student} />)}
      {mode === SHOW && (
         <Show
            student={props.interview.student}
            interviewer={interview.interviewer}
            onCancel={()=> transition(CONFIRM)}
            onEdit={()=> transition(EDIT)}
         />
      )}
   </article>);
}
