const { useState } = require("react");

 const useVisualMode = function (initial) {
   const [mode, setMode] = useState(initial);
   const [history, setHistory] = useState([initial]);

   const transition = function (newMode, replace = false) {
     if (!replace) {
       setHistory(prev => ([...prev, mode]))
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
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1])
      setHistory(newHistory)
    } else {
      return;
    }
  };
  return { mode, transition, back };
}

export default useVisualMode;


