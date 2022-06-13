const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const { EOL } = require('os');

const fileName = 'CampaignFactory';
const campaignFactoryPath = path.resolve(__dirname, 'build', `${fileName}.json`);
const compiledFactory = require(campaignFactoryPath);

const { abi, evm } = compiledFactory;

const provider = new HDWalletProvider(
    `${process.env.MNEMONIC}`,
    `${process.env.RINKEBY_ENDPOINT}`
);

const web3 = new Web3(provider);

const deploy = async () =>
{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ gas: '3000000', from: accounts[0] });

    writeToFile(fileName, campaignFactoryPath, result.options.address);

    console.log('Contract deployed to', result.options.address);
    console.log(`Scan contract at ${process.env.RINKEBY_SCAN}/${result.options.address}`);

    provider.engine.stop();
};

const writeToFile = (contractName, contractPath, address) =>
{
    try
    {
        const importJsonPath = path.relative(path.resolve(__dirname, 'src'), contractPath).split(path.sep).join(path.posix.sep);

        const filePath = path.resolve(__dirname, 'src' ,`${contractName}.js`);
        const file = fs.openSync(filePath, 'w+');

        fs.writeFileSync(file, `import web3 from './web3'`, { flag: 'a+' });
        fs.writeFileSync(file, EOL, { flag: 'a+' });

        fs.writeFileSync(file, `import ${contractName} from '${importJsonPath}'`, { flag: 'a+' });
        fs.writeFileSync(file, EOL, { flag: 'a+' });

        fs.writeFileSync(file, `const address = '${address}';`, { flag: 'a+' });
        fs.writeFileSync(file, EOL, { flag: 'a+' });

        fs.writeFileSync(file, `export default new web3.eth.Contract(${contractName}.abi, address);`, { flag: 'a+' });
        fs.writeFileSync(file, EOL, { flag: 'a+' });

        fs.closeSync(file);
    }
    catch (err)
    {
        console.log(err)
    }
}

deploy();