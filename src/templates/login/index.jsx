import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import parameters from '../../configs/parameters.json'

import './login.css';

const Login = ({darkMode, setDarkMode}) => {

    console.log("parameters", parameters)

    return (
        <div className={`login-container flex flex-column items-center ${darkMode && 'dark-mode'}`}>
            <Image src={!darkMode?parameters.logo: parameters.logo_dark_mode} alt="Logo" />
            <h1>{parameters.login_title}</h1>
            <div className="flex pt3 pt8-l w-100">
                <InputText placeholder={parameters.placeholder_input_user}/>
            </div>
            <div className="flex pt3 pt5-l w-100">
                <Password toggleMask feedback={false} placeholder={parameters.placeholder_input_password}/>
            </div>
            <div className="flex pt3 pt5 w-100">
                <Button label={parameters.label_button_link_password_recover} className="p-button-link" />
            </div>
            <div className="flex pt3 pt5 w-100">
                <Button label={parameters.label_button_login}/>
            </div>
            <div className="flex pt3 pt5 w-100 items-center justify-center">
                <InputSwitch checked={darkMode} onChange={(e) => setDarkMode( e.value )} />
                <p>{parameters.label_dark_mode}</p>
            </div>
        </div>
    )
}

export default Login