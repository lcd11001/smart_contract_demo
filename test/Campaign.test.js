const path = require('path')
const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');

const options = {
    logging: {
        quiet: true
    }
}
const web3 = new Web3(ganache.provider(options));

const buildPath = path.resolve(__dirname, '..', 'ethereum', 'build');
const factoryPath = path.resolve(buildPath, 'CampaignFactory.json');
const campaignPath = path.resolve(buildPath, 'Campaign.json');

const compiledFactory = require(factoryPath);
const compiledCampaign = require(campaignPath);

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () =>
{
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '3000000' });

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '3000000'
    });

    const addresses = await factory.methods.getDeployedCampaigns().call();
    campaignAddress = addresses[0];

    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaign testing', () =>
{
    it('deploy a factory and a campaign', () =>
    {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as the campaign manager', async () =>
    {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allow people to contribute money and marks them as approvers', async () =>
    {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: 200
        });

        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('requires a minimum contribution', async () =>
    {
        try
        {
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: 0
            });

            assert(false);
        }
        catch (err)
        {
            assert(err);
        }
    });

    it('allows a manager to make a payment request', async () =>
    {
        const description = 'Buy something';
        await campaign.methods.createRequest(description, 100, accounts[1]).send({
            from: accounts[0],
            gas: '1000000'
        });

        const request = await campaign.methods.requests(0).call();

        assert.equal(description, request.description);
    });

    it('process requests', async () =>
    {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: Web3.utils.toWei('10', 'ether')
        });

        const description = 'Buy something';
        await campaign.methods.createRequest(description, Web3.utils.toWei('5', 'ether'), accounts[1]).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let initBalance = await web3.eth.getBalance(accounts[1]);
        initBalance = web3.utils.fromWei(initBalance, 'ether');
        initBalance = parseFloat(initBalance);

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let finalBalance = await web3.eth.getBalance(accounts[1]);
        finalBalance = web3.utils.fromWei(finalBalance, 'ether');
        finalBalance = parseFloat(finalBalance);

        // console.log('initBalance', initBalance);
        // console.log('finalBalance', finalBalance);

        assert(finalBalance - initBalance > 4.9);
    });
});