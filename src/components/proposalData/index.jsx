import {useEffect, useState}  from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import InputText from '../../components/InputText'
import mockPrazosVigencia from '../../mocks/prazo-vigencia.json'
import { GetDataProposal } from '../../utils/routes'
import { getDateToday, 
    setNewEndDateValidity, 
    setNewInitDateValidity,
    getDateFormatText} from '../../utils/dates'
import parameters from '../../configs/parameters.json';
import { showNotification } from "../../utils/notification"
const ProposalData = ({notification}) => {
    
    const dataMock = GetDataProposal()
    const [initDateValidity , setInitDateValidity] = useState(null)
    const [endDateValidity , setEndDateValidity] = useState(null)
    const [termValidity , setTermValidity] = useState(null)


    useEffect(() => {
        let termValidity = dataMock.termValidity;
        setTermValidity(termValidity)
        setInitDateValidity(getDateToday())
        setEndDateValidity(setNewEndDateValidity(getDateToday(),termValidity))
    },[dataMock]);

    const actionSetTermValidity = (value) => {
        setTermValidity(value)
        setEndDateValidity(setNewEndDateValidity(initDateValidity, value))

        showNotification(notification, 
            'success', 
            parameters.admin_parameters_term_validity_sucess_title, 
            parameters.admin_parameters_term_validity_sucess_text +value+ ' anos.', 
            parameters.admin_parameters_showNotification_time
        )
    }

    const actionInitDateValidity = (value) => {
        setInitDateValidity(value)
        setEndDateValidity(setNewEndDateValidity(value, termValidity))

        showNotification(notification, 
            'success', 
            parameters.admin_parameters_date_init_term_validity_sucess_title, 
            parameters.admin_parameters_date_init_term_validity_sucess_text + getDateFormatText(value), 
            parameters.admin_parameters_showNotification_time
        )
    }

    const actionEndDateValidity = (value) => {
        setEndDateValidity(value)
        setInitDateValidity(setNewInitDateValidity(value, termValidity))

        showNotification(notification, 
            'success', 
            parameters.admin_parameters_date_end_term_validity_sucess_title, 
            parameters.admin_parameters_date_end_term_validity_sucess_text + getDateFormatText(value), 
            parameters.admin_parameters_showNotification_time
        )
    }

    return(
        <Accordion activeIndex={0}>
            <AccordionTab header={<><i className="pi pi-exclamation-circle"></i><span>Dados da Proposta</span></>}>
                <div className="proposal-data-container flex w-100 flex-column">
                    <div className="flex-row-1 flex w-100 pt5 flex-column-s flex-row-l">
                        <div className="flex w-100 pr0-s pr3-l">
                            <InputText id='produto'
                            label='Produto' disabled
                            value={dataMock.product}/>
                        </div>
                        <div className="flex w-100 pl0-s pl3-l pt5-s pt0-l">
                            <InputText id='modalidade'
                            label='Modalidade' disabled
                            value={dataMock.modality}/>
                        </div>
                    </div>
                    <div className="flex-row-2 flex w-100 pt5-s pt7-l flex-column-s flex-row-l">
                        <div className="flex w-100 pr0-s pr3-l">
                            <InputText id='proposta'
                            label='Proposta' disabled/>
                        </div>
                        <div className="flex w-100 pr0-s pr3-l pt5-s pt0-l">
                            <span className="p-float-label">
                                <Calendar id="data" value={null} 
                                    showIcon disabled/>
                                <label htmlFor="data">Data</label>
                            </span>
                        </div>
                        <div className="flex w-100 pr0-s pr3-l pt5-s pt0-l">
                            <InputText id='apolice'
                            label='Apólice' disabled/>
                        </div>
                        <div className="flex w-100 pt5-s pt0-l">
                            <InputText id='situacao'
                            label='Situação' disabled/>
                        </div>
                    </div>
                    <div className="flex-row-3 flex w-100 pt5-s pt7-l flex-column-s flex-row-l">
                        <div className="flex w-100 pr0-s pr3-l pt7-s pt0-l">
                            <span className="p-float-label">
                                <Calendar id="inicio-vigencia" 
                                    dateFormat="dd/mm/yy"
                                    value={initDateValidity} 
                                    showIcon
                                    onChange={(e) => actionInitDateValidity(e.value)}/>
                                <label htmlFor="inicio-vigencia">Início de vigência</label>
                            </span>
                        </div>
                        <div className="flex w-100 pr0-s pr3-l pt7-s pt0-l">
                            <span className="p-float-label">
                                <Dropdown inputId="prazo-vigencia" 
                                    optionLabel="name" 
                                    optionValue="code" 
                                    value={termValidity} 
                                    options={mockPrazosVigencia}
                                    onChange={(event) => actionSetTermValidity(event.value)}/>
                                <label htmlFor="prazo-vigencia">Prazo de vigência</label>
                            </span>
                        </div>
                        <div className="flex w-100 pr0-s pr3-l pt7-s pt0-l pl0-s pl3-l">
                        <span className="p-float-label">
                            <Calendar id="final-vigencia" 
                                dateFormat="dd/mm/yy"
                                value={endDateValidity} 
                                showIcon 
                                onChange={(e) => actionEndDateValidity(e.value)}/>
                            <label htmlFor="final-vigencia">Final de vigência</label>
                        </span>
                        </div>
                    </div>
                </div>
            </AccordionTab>
        </Accordion>
    )
}

export default ProposalData