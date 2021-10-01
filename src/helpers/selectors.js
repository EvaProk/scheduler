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


// module.exports = {getAppointmentsForDay};

