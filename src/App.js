import React, { useEffect, useState, Fragment } from "react";
import web3 from "./Utils/w3";
import lottery from "./Utils/lottery";

function App()
{
    // console.log('web3.version', web3.version);

    const [manager, setManager] = useState('')
    const [players, setPlayers] = useState([])
    const [balance, setBalance] = useState('')
    const [value, setValue] = useState(0)
    const [message, setMessage] = useState('')
    const [lastWinner, setLastWinner] = useState('')

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

        lottery.methods.getLastWinner().call().then(winner =>
        {
            setLastWinner(winner);
        })

        web3.eth.getBalance(lottery.options.address).then(balance =>
        {
            setBalance(balance);
        })
    }, [])

    const onEtherEnterChanged = (e) =>
    {
        setValue(e.target.value)
    }

    const onSubmit = async (e) =>
    {
        e.preventDefault();
        console.log('onSubmit')

        setMessage('Waiting on transaction ...')

        try
        {
            const accounts = await web3.eth.getAccounts();
            const transaction = await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            })

            console.log('transaction success', transaction)
            setMessage(`transaction sucess ${transaction.transactionHash}`);
        }
        catch (err)
        {
            console.log('transaction fail', err)
            setMessage(`transaction fail ${err.message ? err.message : err}`)
        }
    }

    const onPickWinnerClicked = async (e) =>
    {
        console.log('onPickWinnerClicked')

        setMessage('Waiting on picking winner ...')

        try
        {
            const accounts = await web3.eth.getAccounts();
            const transaction = await lottery.methods.pickWinner().send({
                from: accounts[0]
            })
            const lastWinner = await lottery.methods.getLastWinner().call({
                from: accounts[0]
            })
            
            setLastWinner(lastWinner)

            console.log('transaction success', transaction)
            setMessage(`A winner has been picked ${lastWinner}`);
        }
        catch (err)
        {
            console.log('transaction fail', err)
            setMessage(`transaction fail ${err.message ? err.message : err}`)
        }
    }


    return (
        <div>
            <h2>Lottery Contract</h2>
            <p>This contract is managed by {manager}</p>
            <p>There are currently {players.length} people entered, competing to win {web3.utils.fromWei(balance, 'ether')} ether!</p>


            {
                !web3.utils.toBN(lastWinner).isZero() &&
                <Fragment>
                    <hr />
                    <p>The last winner is {lastWinner}</p>
                    <hr />
                </Fragment>
            }


            <form onSubmit={onSubmit}>
                <h4>Want to try your luck?</h4>
                <div>
                    <label>Amount of ether to enter</label>
                    <input
                        value={value}
                        onChange={onEtherEnterChanged}
                    />
                </div>
                <button type="submit">Enter</button>
            </form>

            <hr />

            <h4>Ready to pick a winner</h4>
            <button onClick={onPickWinnerClicked}>Pick a winner</button>

            <hr />

            <p>{message}</p>
        </div>
    );
}

export default App;
