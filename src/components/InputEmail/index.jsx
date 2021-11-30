import parameters from '../../configs/parameters.json';
import { InputText } from 'primereact/inputtext';

const InputEmail = ({isError, setEmail, value}) => {
    return(
        <div className="input-email flex flex-column pt6 pt8-l w-100">
            <InputText id="input_user_email"
                aria-describedby="input_user_email_help"
                className={isError&&`p-invalid p-d-block`}
                placeholder={parameters.placeholder_input_user}
                onChange={(e) => setEmail(e.target.value)}
                value={value}/>
                {isError&&<small id="input_user_email_help" 
                    className="p-error p-d-block">{parameters.label_input_user_invalid}</small>}
        </div>
    )
}

export default InputEmail