const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'viable priority middle arrive photo address squeeze dignity fury oblige dignity indicate',
    'https://sepolia.infura.io/v3/38dc49a1da684d449c8618c9cf53ab15'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] })
        .catch((err) => {console.log(err)});

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();