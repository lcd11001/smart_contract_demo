import React from "react";
import web3 from "./Utils/w3";

function App()
{
  console.log('web3.version', web3.version);
  

    web3.eth.getAccounts().then(console.log);
  

  return (
    <div>
      Hello Smart Contract
    </div>
  );
}

export default App;
