const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const campaignSource = fs.readFileSync(campaignPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: campaignSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}

const result = solc.compile(JSON.stringify(input));
const contracts = JSON.parse(result).contracts;
const output = contracts['Campaign.sol'];

// console.log(output);

fs.ensureDirSync(buildPath);

for (let contract in output)
{
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract],
        {
            spaces: 2
        }
    );
}