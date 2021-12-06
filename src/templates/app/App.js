
import { useState, useEffect, useRef} from "react";
import { Routes, Route } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { setLocalStorageItem, getLocalStorageItem } from "../../utils/localStorage";
import "./app.css";
import routes from '../../configs/routes.json'
import Login from '../login'
import Layout from '../layout'
import Proposal from '../proposal'
import { addDarkModeBody, removeDarkModeBody} from '../../utils/scripts'
function App() {
 
  const notification = useRef(null);
  
  const [ darkMode, setDarkMode] = useState(false)
  
  useEffect(() => {
    if(getLocalStorageItem('dark-mode')) {
      setDarkMode(true)
      addDarkModeBody();
    }
  },[]);

  const actionDarkMode = () => {
    setLocalStorageItem('dark-mode', !darkMode)
    setDarkMode(!darkMode)
    
    if(!darkMode){
      addDarkModeBody()
    }else{
      removeDarkModeBody();
    }
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
              setDarkMode={actionDarkMode}
              notification={notification}/>
          }/>
        <Route path={routes.PROPOSTA_PUBLICO_JUDICIAL_RECURSAL} 
          element={
            <Layout darkMode={darkMode}
              setDarkMode={actionDarkMode} children={<Proposal notification={notification}/>}/>
        }/>
      </Routes>
      <Toast ref={notification} position="bottom-left" />
    </div>
  );
}

export default App;
