export const  getAppointmentsForDay = function(state, day){
  
  const filteredDays = [];
  const resArr = [];
  
   for(const item of state.days){
     if(item.name === day){
      for(const app of  item.appointments){
        filteredDays.push(app);
      }
     }
   }

   for(const index of filteredDays){
     if(index === state.appointments[index].id){ 
      resArr.push(state.appointments[index]);
     }
   }
    
  return resArr;
}

export const  getInterview = function(state, interview){
  if (!interview) {
    return null;
  } else {

    return {student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  //   interview.interviewer = state.interviewers[interview.interviewer];
  //   return interview;
  // }
}
}

export const getInterviewersForDay = function(state, day){
  const filteredInterv = [];
  const resArr = [];
  
   for(const item of state.days){
     if(item.name === day){
      for(const interviewer of item.interviewers){
        filteredInterv.push(interviewer);
      }
     }
   }

   for(const index of filteredInterv){
     if(index === state.interviewers[index].id){ 

      resArr.push(state.interviewers[index]);
     }
   }
  return resArr;
}