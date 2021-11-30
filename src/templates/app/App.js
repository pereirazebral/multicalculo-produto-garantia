
import { useState, useEffect, useRef} from "react";
import { Routes, Route } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { setLocalStorageItem, getLocalStorageItem } from "../../utils/localStorage";
import "./app.css";
import Login from '../login/index'

function App() {
 
  const notification = useRef(null);
  
  const [ darkMode, setDarkMode] = useState(false)
  
  useEffect(() => {
    if(getLocalStorageItem('dark-mode')) setDarkMode(true)
  },[]);

  const actionDarkMode = () => {
    setLocalStorageItem('dark-mode', !darkMode)
    setDarkMode(!darkMode)
  }
  
  return (
    <div className={`app-container ${darkMode && 'dark-mode'}`}>
      <Routes>
        <Route path="/" element={
          <Login darkMode={darkMode}
          setDarkMode={actionDarkMode}
          notification={notification}/>
        }/>
        <Route path="/login" 
          element={
            <Login  darkMode={darkMode}
              setDarkMode={actionDarkMode}/>
          }/>
      </Routes>
      <Toast ref={notification} position="bottom-left" />
    </div>
  );
}

export default App;
