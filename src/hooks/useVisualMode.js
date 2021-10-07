import { useState} from "react";

 const useVisualMode = function (initial) {
   const [mode, setMode] = useState(initial);
   const [history, setHistory] = useState([initial]);
   const transition = function (mode, replace = false) {
     if (!replace) {
       setHistory(prev => [...prev, mode])
       setMode(mode);
     } else {
       const newHistory = [...history];
       newHistory.splice([newHistory.length - 1], 1, mode)
       setHistory(newHistory);
       setMode(mode)
     };
   };
  function back() {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1])
     setHistory(newHistory)
    };
  };
  return { mode, transition, back };
};

export default useVisualMode;


