import React, { useEffect, useState } from "react";
import web3 from "./Utils/w3";
import lottery from "./Utils/lottery";

function App()
{
    console.log('web3.version', web3.version);

    const [manager, setManager] = useState('')
    const [players, setPlayers] = useState([])
    const [balance, setBalance] = useState('')

    useEffect(() =>
    {
        lottery.methods.manager().call().then(manager =>
        {
            setManager(manager);
        })

        lottery.methods.getPlayers().call().then(players =>
        {
            setPlayers(players);
        })

        web3.eth.getBalance(lottery.options.address).then(balance =>
        {
            setBalance(balance);
        })
    }, [])


    return (
        <div>
            <h2>Lottery Contract</h2>
            <p>This contract is managed by {manager}</p>
            <p>There are currently {players.length} people entered, competing to win {web3.utils.fromWei(balance, 'ether')} ether!</p>
        </div>
    );
}

export default App;
