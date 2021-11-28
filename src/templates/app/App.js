
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from '../login/index'
function App() {
  
  const [ darkMode, setDarkMode] = useState(false)
  
  return (
    <div className={`app-container ${darkMode && 'dark-mode'}`}>
      <Routes>
        <Route path="/" element={
          <Login darkMode={darkMode}
          setDarkMode={setDarkMode}/>
        }/>
        <Route path="/login" element={<Login  darkMode={darkMode}
          setDarkMode={setDarkMode}/>} />
      </Routes>
    </div>
  );
}

export default App;
