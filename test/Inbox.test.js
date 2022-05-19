const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const { abi, evm } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

const INIT_MESSAGE = 'Hi there!'
const NEW_MESSAGE = 'hello LCD!'

beforeEach(async () =>
{
    // Get a list of all accounts
    /*
    web3.eth.getAccounts()
        .then(fetchAccounts =>
        {
            console.log(fetchAccounts);
        })
        .catch(err =>
        {
            console.log('getAccounts error', err)
        });
    */

    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [INIT_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox testing', () =>
{
    it('deploy a contract', () =>
    {
        assert.ok(inbox.options.address);
    });

    it('has default message', async () =>
    {
        const message = await inbox.methods.message().call();
        assert.equal(message, INIT_MESSAGE);
    })

    it('has update message', async () =>
    {
        await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, NEW_MESSAGE);
    })
});