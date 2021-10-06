import { useState} from "react";

 const useVisualMode = function (initial) {
   const [mode, setMode] = useState(initial);
   const [history, setHistory] = useState([initial]);

   const transition = function (newMode, replace = false) {
     if (!replace) {
       setHistory(prev => [...prev, mode])
       setMode(newMode);
     } else {
       const newHistory = [...history];
       newHistory.splice([newHistory.length - 1], 1, newMode)
       setHistory(newHistory);
       setMode(newMode)
     };
   }

  function back() {
    if (history.length > 1) {
      const newHistory = [...history];
      console.log(newHistory)
      newHistory.pop();
      
      setMode(newHistory[newHistory.length - 1])
      // console.log(mode)
     setHistory(newHistory)
    }
    
  };

  return { mode, transition, back };
}

export default useVisualMode;


