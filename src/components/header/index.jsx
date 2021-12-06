import { InputSwitch } from 'primereact/inputswitch';
import { Image } from 'primereact/image';
import parameters from '../../configs/parameters.json';
import './header.css'
const Header = ({
    darkMode,
    setDarkMode
}) => {
    return(
        <header className={`header-container ${darkMode && 'dark-mode'}`}>
            
            <Image src={!darkMode?parameters.admin_parameters_logo: parameters.admin_parameters_dark_mode_logo} alt="Logo" />
                
            <div className="flex items-center justify-center">
                    <p className="text-dark-mode">{parameters.admin_parameters_text_dark_mode}</p>
                    <InputSwitch checked={darkMode} onChange={(e) => setDarkMode( e.value )} />
                    
            </div>
        </header>
    )
}

export default Header