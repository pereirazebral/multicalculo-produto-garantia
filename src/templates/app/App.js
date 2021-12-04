
import { useState, useEffect, useRef} from "react";
import { Routes, Route } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { setLocalStorageItem, getLocalStorageItem } from "../../utils/localStorage";
import "./app.css";
import routes from '../../configs/routes.json'
import Login from '../login'
import Layout from '../layout'
import Proposta from '../proposta'
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
        <Route path={routes.LOGIN} 
          element={
            <Login  darkMode={darkMode}
              setDarkMode={actionDarkMode}/>
          }/>
        <Route path={routes.PROPOSTA_PUBLICO_JUDICIAL_RECURSAL} 
          element={
            <Layout  darkMode={darkMode}
              setDarkMode={actionDarkMode} children={<Proposta darkMode={darkMode}/>}/>
        }/>
      </Routes>
      <Toast ref={notification} position="bottom-left" />
    </div>
  );
}

export default App;
