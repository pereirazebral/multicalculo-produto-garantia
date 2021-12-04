import { InputSwitch } from 'primereact/inputswitch';
import parameters from '../../configs/parameters.json';
import './header.css'
const Header = ({
    darkMode,
    setDarkMode
}) => {
    return(
        <header className={`header-container ${darkMode && 'dark-mode'}`}>
            <p>header component</p>
            <div className="flex items-center justify-center">
                    <InputSwitch checked={darkMode} onChange={(e) => setDarkMode( e.value )} />
                    <p className="text-dark-mode">{parameters.admin_parameters_text_dark_mode}</p>
            </div>
        </header>
    )
}

export default Header