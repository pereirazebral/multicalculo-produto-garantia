import { useState, useEffect } from 'react';
import { Image } from 'primereact/image';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import ModalPasswordRecover from '../modalPasswordRecover'
import parameters from '../../configs/parameters.json';
import TextIsEmpty from '../../utils/validators/TextIsEmpty'
import InputEmail from '../../components/InputEmail'
import { setLocalStorageItem, getLocalStorageItem , removeLocalStorageItem} from "../../utils/localStorage";
import './login.css';

const Login = ({darkMode, setDarkMode, setIsModalPasswordRecover, notification}) => {

    const [ userEmail, setUserEmail] = useState("")
    const [ userEmailError, setUserEmailError] = useState(false)
    const [ userPassword, setUserPassword] = useState('')
    const [ userPasswordError, setUserPasswordError] = useState(false)
    const [rememberUser, setRememberUser] = useState(false)

    useEffect(() => {
        if(getLocalStorageItem('remember-user')) {
            setRememberUser(true)
            setUserEmail(getLocalStorageItem('user'))
        }
    },[]);

    const actionRememberUser = () => {
        if(!rememberUser === true){
            setLocalStorageItem('user', userEmail)
        }else{
            removeLocalStorageItem("user")
        }
        setLocalStorageItem('remember-user', !rememberUser)
        setRememberUser(!rememberUser)
      }

    const actionLogin = () => {
        setUserEmailError(false)
        if(TextIsEmpty(userEmail)){
            setUserEmailError(true)
            return false
        }

        setUserPasswordError(false)
        if(TextIsEmpty(userPassword)){
            setUserPasswordError(TextIsEmpty(userPassword))
            return false
        }

        if(rememberUser) setLocalStorageItem('user', userEmail)
    }

    return (
        <div className={`login-container flex flex-column items-center ${darkMode && 'dark-mode'}`}>
            <Image src={!darkMode?parameters.logo: parameters.logo_dark_mode} alt="Logo" />
            <h1>{parameters.title_login}</h1>
            <InputEmail value={userEmail}
                isError={userEmailError}
                setEmail={setUserEmail}/>
            <div className="flex flex-column pt6 pt5-l w-100">
                <Password id="input_password"
                    aria-describedby="input_password_help"
                    className={userPasswordError&&`p-invalid p-d-block`} 
                    toggleMask 
                    feedback={false} 
                    placeholder={parameters.placeholder_input_password}
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}/>
                {userPasswordError&&<small id="input_password_help" 
                    className="p-error p-d-block">{parameters.label_input_password_invalid}</small>}
            </div>
            <div className="flex pt3 pt5 w-100 items-center justify-end">
                <p className="text-remember-user">{parameters.label_remember_user}</p>
                <InputSwitch checked={rememberUser} 
                    onChange={() => actionRememberUser()} />
            </div>
            <div className="flex pt3 pt5 w-100">
                <Button label={parameters.label_button_link_password_recover} 
                className="p-button-link" 
                onClick={() => setIsModalPasswordRecover(true)}/>
            </div>
            <div className="flex pt3 pt5 w-100">
                <Button label={parameters.label_button_login}
                    onClick={() => actionLogin()}/>
            </div>
            <div className="flex pt3 pt5 w-100 items-center justify-center">
                <InputSwitch checked={darkMode} onChange={(e) => setDarkMode( e.value )} />
                <p className="text-dark-mode">{parameters.label_dark_mode}</p>
            </div>
        </div>
    )
}

const LoginContent = ({darkMode, setDarkMode, notification}) => {
    
    const [ isModalPasswordRecover, setIsModalPasswordRecover] = useState(false)
    
    return(
        <>
            <Login darkMode={darkMode} 
                setDarkMode={setDarkMode}
                setIsModalPasswordRecover={setIsModalPasswordRecover}
                notification={notification}/>
            <ModalPasswordRecover darkMode={darkMode}
                visible={isModalPasswordRecover}
                closeModalPasswordRecover={() => setIsModalPasswordRecover(false)}
                notification={notification}/>
        </>
    )
}

export default LoginContent