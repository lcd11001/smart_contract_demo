const path = require('path');
const fs = require('fs');
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const inboxSource = fs.readFileSync(inboxPath, 'utf-8');

// console.log(solc.compile(inboxSource, 1));

const inboxCompiled = solc.compile(inboxSource, 1);
// console.log(inboxCompiled);
module.exports = inboxCompiled.contracts[':Inbox'];
