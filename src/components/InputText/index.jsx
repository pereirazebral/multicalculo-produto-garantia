import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext';

const InputTextContainer = ({
    className,
    id,
    name,
    isError,
    placeholder,
    onChange, 
    value,
    errorMessage
}) => {
    return(
        <div className={`${className} flex flex-column w-100 pt3 pb3`}>
            <InputText id={id}
                name={name}
                aria-describedby="input_user_email_help"
                className={isError&&`p-invalid p-d-block`}
                placeholder={placeholder}
                onChange={onChange}
                value={value}/>
                {isError&&
                    <small id="input_user_email_help" className="p-error p-d-block">
                        {errorMessage}
                    </small>
                }
        </div>
    )
}

InputTextContainer.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    isError: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
    errorMessage: PropTypes.string
}

InputTextContainer.defaultProps = {
    className: '',
    id: '',
    name: '',
    isError: false,
    placeholder: '',
    onChange: null,
    value: '',
    errorMessage: ''
}

export default InputTextContainer