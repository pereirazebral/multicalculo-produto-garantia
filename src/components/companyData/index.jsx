import {useState}  from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { AutoComplete } from 'primereact/autocomplete';
import parameters from '../../configs/parameters.json';
import portaBrokerApi from '../../services/portaBrokerApi'
import './companyData.css'
import { showNotification } from "../../utils/notification"
//import axios from 'axios';
const CompanyData = ({
    notification
}) => {
    
    const [selectCompany, setSelectCompany] = useState(null)
    const [suggestionsCompany, setSuggestionsCompany] = useState(null)
    
    function searchCompany(event) {
        setTimeout(() => {
            portaBrokerApi.get('/Taker/name', {
                params: {
                    name: event.query
                }
            })
            .then(function (response) {
                const { data } = response
                setSuggestionsCompany(data)
            })
            .catch(function (error) {
                console.log(error);
            })
        }, 250);
    }
    
    if(selectCompany?.Id){
        showNotification(notification, 
            'success', 
            parameters.admin_parameters_autocomplete_sucess_title, 
            'A empresa ' +selectCompany.Name+ ' foi selecionada.', 
            parameters.admin_parameters_showNotification_time
        )
    }

    return(
        <div className="company-data-container">
            <Accordion activeIndex={0}>
                <AccordionTab header={<><i className="pi pi-building"></i><span>Empresa</span></>}>
                    <div className="company-data-container-internal flex w-100 flex-column pt5">
                        <span className="p-float-label">
                            <AutoComplete 
                                id='selectCompany'
                                placeholder={parameters.admin_parameters_autocomplete_company}
                                value={selectCompany} 
                                suggestions={suggestionsCompany}
                                completeMethod={searchCompany}
                                field="Name" 
                                onChange={(e) => setSelectCompany(e.value )} />
                            <label htmlFor="selectCompany">{parameters.admin_parameters_autocomplete_company}</label>  
                        </span>
                    </div>
                </AccordionTab>
            </Accordion>
        </div>
    )
}

export default CompanyData