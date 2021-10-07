import React from "react";
import "components/InterviewerListItem.scss";
import classnames from 'classnames';
export default function InterviewerListItem(props) {

  let interviewClass = classnames({
    "interviewers__item": true,
    " interviewers__item--selected": props.selected === true
  });
  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};