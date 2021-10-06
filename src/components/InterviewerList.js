import React from "react";
import InterviewerListItem from 'components/InterviewerListItem';
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

 function InterviewerList(props) {

  const interviewers = props.interviewers;
  const listInterviewer = interviewers.map((interviewer) =>
    <InterviewerListItem key={interviewer.id}
    // id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
  
      setInterviewer={() => props.setInterviewer(interviewer.id)}
      
      />


  );



  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listInterviewer}</ul>
    </section>
  );
};


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;