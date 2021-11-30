import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import parameters from '../../configs/parameters.json';
import TextIsEmpty from '../../utils/validators/TextIsEmpty'
import InputEmail from '../../components/InputEmail'
import { showNotification } from "../../utils/notification"
import './modal-password-recover.css'
const ModalPasswordRecover =  ({darkMode, visible, closeModalPasswordRecover, notification}) => {
    const [ userEmail, setUserEmail] = useState("")
    const [ userEmailError, setUserEmailError] = useState(false)

    const actionSend = () => {
        setUserEmailError(false)
        if(TextIsEmpty(userEmail)){
            setUserEmailError(true)
            return false
        }
        
        showNotification(notification, 
            'success', 
            parameters.mensage_title_password_recover_sucess, 
            parameters.mensage_content_password_recover_sucess, 98000)


        closeModal()
    }

    const closeModal = () => {
        setUserEmail('')
        setUserEmailError(false)
        closeModalPasswordRecover()
    }

    return(
        <div>
            <Dialog header={parameters.title_modal_password_recover} 
                visible={visible}
                onHide={closeModal}
                className={`modal-password-recover ${darkMode && 'dark-mode'}`}>
                    <p className="text_modal_password_recover">{parameters.text_modal_password_recover}</p>
                    <InputEmail value={userEmail}
                        isError={userEmailError}
                        setEmail={setUserEmail}/>
                     <div className="flex pt3 pt5 w-100">
                    <Button label={parameters.label_enviar}
                        onClick={() => actionSend()}/>
                    </div>
            </Dialog>
        </div>
    )
}

export default ModalPasswordRecover