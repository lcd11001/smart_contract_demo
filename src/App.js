import React from "react";
import web3 from "./Utils/w3";

function App() {
  console.log('web3.version', web3.version);
  return (
    <div>
      Hello Smart Contract
    </div>
  );
}

export default App;
