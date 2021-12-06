import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useFormik } from 'formik';
import { Image } from 'primereact/image';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import ModalPasswordRecover from '../modalPasswordRecover'
import parameters from '../../configs/parameters.json';
import IsNotEmpty from '../../utils/validators/IsNotEmpty'
import IsEmail from '../../utils/validators/IsEmail'
import InputText from '../../components/InputText'
import { setLocalStorageItem, getLocalStorageItem , removeLocalStorageItem} from "../../utils/localStorage";
import './login.css';

const Login = ({darkMode, setDarkMode, setIsModalPasswordRecover, notification}) => {

    const [rememberUser, setRememberUser] = useState(false)
    const [formData, setFormData] = useState({})
    const [submitLoading, setSubmitLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    useEffect(() => {
        if(getLocalStorageItem('remember-user')) {
            setRememberUser(true)
        }
    },[]);

    const getRememberUser = () => {
        
        if(getLocalStorageItem('remember-user')) {
            return getLocalStorageItem('user')
        }

        return ''
    }

    const actionRememberUser = () => {
        if(!rememberUser === true){
            setLocalStorageItem('user', formik.values.email)
        }else{
            removeLocalStorageItem("user")
        }
        setLocalStorageItem('remember-user', !rememberUser)
        setRememberUser(!rememberUser)
      }

    const formik = useFormik({
        initialValues: {
            email: getRememberUser(),
            password: '',
        },
        validate: (data) => {
            let errors = {};

            if (IsNotEmpty(data.email) || !IsEmail(data.email)) {
                errors.email = parameters.admin_parameters_text_email_invalid;
            }

            if (IsNotEmpty(data.password)) {
                errors.password = parameters.admin_parameters_text_password_invalid
            }

            return errors;
        },
        onSubmit: (data) => {
            setSubmitLoading(true)
            setFormData(data);
            if(rememberUser) setLocalStorageItem('user', data.email)
            //formik.resetForm(); //limpa o form
            
            setTimeout(() => {
                setSubmitLoading(false);
                setIsLogged(true)
                setLocalStorageItem('acess_token', formData)
            },5000);
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return formik.errors[name] && formik.errors[name];
    };

    return (
        <div className="login-container">
            <div className={`login-content flex flex-column items-center ${darkMode && 'dark-mode'}`}>
                <Image src={!darkMode?parameters.admin_parameters_logo: parameters.admin_parameters_dark_mode_logo} alt="Logo" />
                <h1>{parameters.admin_parameters_login_title}</h1>
                <form onSubmit={formik.handleSubmit} className="flex flex-column w-100">
                    <InputText id="email" 
                        name="email"
                        value={formik.values.email}
                        isError={isFormFieldValid('email')}
                        errorMessage={getFormErrorMessage('email')}
                        onChange={formik.handleChange}
                        placeholder={parameters.admin_parameters_text_email}
                        />
                    <div className="flex flex-column w-100 pt3 pb3">
                        <Password id="password" 
                            name="password"
                            aria-describedby="input_password_help"
                            className={isFormFieldValid('password')&&`p-invalid p-d-block`} 
                            toggleMask 
                            feedback={false} 
                            placeholder={parameters.admin_parameters_text_password}
                            onChange={formik.handleChange}
                            value={formik.values.password}/>
                        {isFormFieldValid('password')&&<small id="input_password_help" 
                            className="p-error p-d-block">{getFormErrorMessage('password')}</small>}
                    </div>
                    <div className="flex pt3 pb3 w-100 items-center justify-end">
                        <p className="text-remember-user">{parameters.admin_parameters_text_remember_user}</p>
                        <InputSwitch checked={rememberUser} 
                            onChange={() => actionRememberUser()} />
                    </div>
                    <div className="flex pt3 pb3 w-100">
                        <Button label={!submitLoading&&parameters.admin_parameters_text_login}
                            type="submit"
                            loading={submitLoading} />
                    </div>
                </form>
                <div className="flex pt3 pb3 w-100">
                        <Button label={parameters.admin_parameters_text_password_recover} 
                        className="p-button-link" 
                        onClick={() => setIsModalPasswordRecover(true)}/>
                </div>
                <div className="flex pt3 pb3 w-100 items-center justify-center">
                    <InputSwitch checked={darkMode} onChange={(e) => setDarkMode( e.value )} />
                    <p className="text-dark-mode">{parameters.admin_parameters_text_dark_mode}</p>
                </div>
            </div>
            {isLogged && <Navigate to="/proposta/publico/judicial/recursal" replace={true}/>}
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