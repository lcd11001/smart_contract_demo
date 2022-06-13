import web3 from './web3'
import CampaignFactory from '../build/CampaignFactory.json'
const address = '0x22d18c478B5Ee634613768A102460C0d77b3946c';
const abi = JSON.parse(CampaignFactory.abi);
export default new web3.eth.Contract(abi, address);
