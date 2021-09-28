import React from "react";
import classnames from 'classnames';

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = classnames({
      "button" :true,
      " button--confirm": props.confirm,
      " button--danger": props.danger

   });
 
   return <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>;
}


// let buttonClass = "button";

//    if (props.confirm) {
//      buttonClass += " button--confirm";
//    }else if(props.danger) {
//       buttonClass += " button--danger";
//    }
 
//    return <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>;
// }

