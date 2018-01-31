const Web3Eth = require('web3-eth')

const bin = require('../src/Kitties.bin')

const web3Eth = new Web3Eth('http://localhost:8545')

web3Eth.getAccounts()
  .then(accounts => {
    web3Eth.defaultAccount = accounts[0]
    return web3Eth.estimateGas({
      data: bin
    })
  })
  .then(gas => web3Eth.sendTransaction({
    data: bin,
    gas
  }))
  .then(tx => console.log(tx))
  .catch(err => console.error(err))
