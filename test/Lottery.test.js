const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const { abi, evm } = require('../compile');

const options = {
    logging: {
        quiet: true
    }
}
const web3 = new Web3(ganache.provider(options));

let accounts;
let lottery;

beforeEach(async () =>
{
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery testing', () =>
{
    it('deploy a contract', () =>
    {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () =>
    {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: Web3.utils.toWei('0.01', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple accounts to enter', async () =>
    {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: Web3.utils.toWei('0.01', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: Web3.utils.toWei('0.01', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            value: Web3.utils.toWei('0.01', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('requires a minimum amount of ether to enter', async () =>
    {
        try
        {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
            assert(false);
        }
        catch (err)
        {
            assert.ok(err);
        }
    });

    it('only manager can call pickWinner', async () =>
    {
        try
        {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        }
        catch (err)
        {
            assert.ok(err);
        }
    });

    it('sends money to the winner and resets the players array', async () =>
    {
        await lottery.methods.enter().send({
            from: accounts[1],
            value: Web3.utils.toWei('2', 'ether')
        });

        const initBalance = await web3.eth.getBalance(accounts[1]);
        // console.log('initBalance', initBalance);

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        const finalBalance = await web3.eth.getBalance(accounts[1]);
        // console.log('finalBalance', finalBalance);

        const difference = finalBalance - initBalance;
        // console.log('difference', difference);
        
        assert.equal(difference, Web3.utils.toWei('2', 'ether'));

        const lastWinner = await lottery.methods.getLastWinner().call({
            from: accounts[0]
        });
        assert.equal(lastWinner, accounts[1]);
    });

    it('sends money to the winner as MANAGER and resets the players array', async () =>
    {
        const method1 = await lottery.methods.enter().send({
            from: accounts[0],
            value: Web3.utils.toWei('2', 'ether')
        });

        const init = await web3.eth.getBalance(accounts[0]);
        const initBalance = web3.utils.toBN(init);
        // console.log('initBalance', initBalance.toString());

        const method2 = await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        // console.log('method2', method2);
        const cost = web3.utils.toBN(method2.gasUsed * method2.effectiveGasPrice);
        // console.log('cost', cost.toString())
        
        const final = await web3.eth.getBalance(accounts[0]);
        const finalBalance = web3.utils.toBN(final);
        // console.log('finalBalance', finalBalance.toString());

        // const diff = final - init;
        // console.log('diff', diff);

        const diffBalance = finalBalance.sub(initBalance);
        // console.log('diffBalance', diffBalance.toString());

        // console.log('2 ether', Web3.utils.toWei('2', 'ether'));
        
        const total = diffBalance.add(cost);
        // console.log('diffBalance + cost', total.toString());
        
        assert.equal(total, Web3.utils.toWei('2', 'ether'));

        const lastWinner = await lottery.methods.getLastWinner().call({
            from: accounts[0]
        });
        assert.equal(lastWinner, accounts[0]);
    });
});