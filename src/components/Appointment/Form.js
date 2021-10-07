import React , { useState }  from "react";
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

// Validates if the form is empry
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }; 
//Cleans the form after save
  const reset = () => {
    setName("")
    setInterviewer(null)
  };
//Cancels the submission
  const cancel = () => {
    reset()
    props.onCancel()
  };

   return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Enter Student Name"
          data-testid="student-name-input"
        />
        <section className="appointment__validation">{error}</section>
      </form> 
      <InterviewerList interviewers={props.interviewers} value={interviewer} setInterviewer={(event) => setInterviewer(event)}/>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
 );
};