const path = require('path');
const fs = require('fs');
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const inboxSource = fs.readFileSync(inboxPath, 'utf-8');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const lotterySource = fs.readFileSync(lotteryPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: inboxSource
        },
        'Lottery.sol': {
            content: lotterySource
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

module.exports = contracts['Lottery.sol'].Lottery