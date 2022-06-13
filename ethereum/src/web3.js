import Web3 from "web3";

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
{
    // we are in the browser and metamask is running
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
}
else
{
    // we are on the server *OR* the user is not running metamask
    // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
    const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/63f8041d6a6347d7a40638accd6ca4c7");
    web3 = new Web3(provider);
}

export default web3;