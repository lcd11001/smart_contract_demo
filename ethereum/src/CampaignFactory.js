import web3 from './web3'
import CampaignFactory from '../build/CampaignFactory.json'
const address = '0x9e6435C4518E250eEd861599E1E9673e784a0bEe';
export default new web3.eth.Contract(CampaignFactory.abi, address);
