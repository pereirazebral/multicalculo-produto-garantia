import ProposalData from '../../components/proposalData'
import CompanyData from '../../components/companyData'

const Proposal = ({notification}) => {
    return(
       <>
            <ProposalData notification={notification}/>
            <CompanyData notification={notification}/>
       </>
    )

}

export default Proposal