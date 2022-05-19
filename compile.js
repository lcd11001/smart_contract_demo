const path = require('path');
const fs = require('fs');
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const inboxSource = fs.readFileSync(inboxPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: inboxSource
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
const contracts = JSON.parse(result).contracts

// console.log(contracts);

module.exports = contracts['Inbox.sol'].Inbox