import React, { useEffect, useState } from "react";
import web3 from "./Utils/w3";
import lottery from "./Utils/lottery";

function App()
{
    console.log('web3.version', web3.version);

    const [manager, setManager] = useState('')

    useEffect(() =>
    {
        lottery.methods.manager().call().then(manager =>
        {
            setManager(manager);
        })
    }, [])


    return (
        <div>
            <h2>Lottery Contract</h2>
            <p>This contract is managed by {manager}</p>
        </div>
    );
}

export default App;
