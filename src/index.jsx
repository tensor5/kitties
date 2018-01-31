import React from 'react'
import ReactDOM from 'react-dom'
import Web3Eth from 'web3-eth'

import './styles'
import App from './App'

const web3Eth = new Web3Eth(Web3Eth.givenProvider || 'ws://localhost:8546')

document.addEventListener('DOMContentLoaded', async () => {
  const accounts = await web3Eth.getAccounts()
  web3Eth.defaultAccount = accounts[0]
  const app = document.getElementById('app')
  ReactDOM.render(<App web3Eth={web3Eth} />, app)
})
