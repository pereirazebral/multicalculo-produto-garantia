import {useLocation} from "react-router-dom";
import ppjr from '../../mocks/proposta-publico-judicial-recursal.json'
const GetDataProposal = () => {
    
    let location = useLocation();
    let key = location.pathname
    switch (key) {
        case '/proposta/publico/judicial/recursal':
            return ppjr
    
        default:
            return null;
    }
}

export { GetDataProposal }