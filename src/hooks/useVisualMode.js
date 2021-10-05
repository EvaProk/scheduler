const { useState } = require("react");

// const useVisualMode = () => {
// 	const [history, setHistory] = useState([]);

// 	const transition = (mode, replace = false) => {
// 		let newHistory;

// 		if (replace) {
// 			newHistory = [...history.slice(0, -1), mode];
// 		} else {
// 			newHistory = [...history, mode];
// 		}

// 		return setHistory(newHistory);
// 	};

// 	const back = () => {
// 		let newHistory;

// 		if (history.length > 1) {
// 			history = [...history].slice(0, -1);
// 		} else {
// 			newHistory = [...history];
// 		}

// 		return setHistory(newHistory);
// 	};

// 	const mode = history[history.length - 1];
//   return { mode, transition, back };
// };
 
 const useVisualMode = function (initial) {
   const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 


  const transition = function (newMode, replace = false) {
  
    if (!replace) {
      setHistory(prev => ([...prev, mode]))
      // setHistory([...history, newMode]);
      setMode(newMode);
    } else {
      // setHistory(prev => {
      //   const newHistory = [...prev];
      //   newHistory[newHistory.length - 1] = newMode;
      //   // return newHistory;
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
        setMode(newHistory[newHistory.length-1])
        setHistory(newHistory)
      
    } else {
      return;
    }
  };

  // const mode = history[history.length - 1];

  return { mode, transition, back };
}

export default useVisualMode;


