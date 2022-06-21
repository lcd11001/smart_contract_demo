import web3 from './web3'
import CampaignFactory from '../build/CampaignFactory.json'
const address = '0xfE3B948101745c3bBadD146379A73b2C71037D27';
export default new web3.eth.Contract(CampaignFactory.abi, address);
