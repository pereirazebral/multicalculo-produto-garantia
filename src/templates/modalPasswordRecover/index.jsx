import { useState } from 'react';
import { useFormik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import parameters from '../../configs/parameters.json';
import IsNotEmpty from '../../utils/validators/IsNotEmpty'
import InputText from '../../components/InputText'
import IsEmail from '../../utils/validators/IsEmail'
import { showNotification } from "../../utils/notification"
import './modal-password-recover.css'
const ModalPasswordRecover =  ({darkMode, visible, closeModalPasswordRecover, notification}) => {
    const [submitLoading, setSubmitLoading] = useState(false)

    const [formData, setFormData] = useState({})

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (data) => {
            let errors = {};

            if (IsNotEmpty(data.email) || !IsEmail(data.email)) {
                errors.email = parameters.admin_parameters_text_email_invalid;
            }

            return errors;
        },
        onSubmit: (data) => {
            setSubmitLoading(true)
            setFormData(data);
            //formik.resetForm(); //limpa o form

            setTimeout(() => {
                setSubmitLoading(false)
                showNotification(notification, 
                    'success', 
                    parameters.admin_parameters_password_recover_sucess_title, 
                    parameters.admin_parameters_password_recover_sucess_text, 
                    parameters.admin_parameters_showNotification_time
                )
                closeModal()
            },5000);
        }
    });

    const closeModal = () => {
        formik.resetForm(); //limpa o form
        closeModalPasswordRecover()
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return formik.errors[name] && formik.errors[name];
    };

    return(
        <div>
            <Dialog header={parameters.admin_parameters_password_recover_modal_title} 
                visible={visible}
                onHide={closeModal}
                className={`modal-password-recover ${darkMode && 'dark-mode'}`}>
                    <p className="text_modal_password_recover">{parameters.admin_parameters_password_recover_modal_text}</p>
                    <form onSubmit={formik.handleSubmit} className="flex flex-column w-100">
                        <InputText id="email" 
                            name="email"
                            value={formik.values.email}
                            isError={isFormFieldValid('email')}
                            errorMessage={getFormErrorMessage('email')}
                            onChange={formik.handleChange}
                            placeholder={parameters.admin_parameters_text_email}/>
                        <div className="flex pt3 pb3 w-100">
                            <Button type="submit"
                                loading={submitLoading}
                                label={!submitLoading&&parameters.admin_parameters_text_send}/>
                        </div>
                    </form>
            </Dialog>
        </div>
    )
}

export default ModalPasswordRecover