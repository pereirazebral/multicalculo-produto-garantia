import Header from '../../components/header/index'
import './layout.css'
const Layout = ({
    darkMode,
    children,
    setDarkMode
}) => {
    return(
        <>
            <Header darkMode={darkMode}
                setDarkMode={setDarkMode}/>
            <div className="layout-container">
                <div className={`layout-content ${darkMode && 'dark-mode'}`}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout