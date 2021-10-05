const { useState } = require("react");
 
 const useVisualMode = function (initial) {
  //  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 


  const transition = function (newMode, replace) {
    if (!replace) {
      setHistory([...history, newMode]);
    } else {
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = newMode;
        return newHistory;
      });
    }
  };

  function back() {
    if (history.length > 1) {
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop();
        return newHistory
      });
    } else {
      return;
    }
  };

  const mode = history[history.length - 1];

  return { mode, transition, back };
}

export default useVisualMode;


