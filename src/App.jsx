import React, {Component} from 'react'
import {Col, Container, Row} from 'reactstrap'

import Adopt from './Adopt'
import abi from './Kitties'

const address = '0x674990dCb6DD128C06543f79866d60c5db3dB57a'

class App extends Component {
  constructor (props) {
    super(props)
    const {web3Eth} = this.props
    this.kitties = new web3Eth.Contract(abi, address, {from: web3Eth.defaultAccount})
    this.state = {
      yourKitties: [],
      loading: true
    }
  }

  componentDidMount () {
    const {web3Eth} = this.props
    const promises = []
    for (let i = 0; i < 16; i++) {
      promises.push(this.kitties.methods.owners(i).call())
    }
    Promise.all(promises)
      .then(owners => {
        const yourKitties = []
        for (let i = 0; i < 16; i++) {
          if (owners[i] === web3Eth.defaultAccount) {
            yourKitties.push(i)
          }
        }
        this.setState({
          yourKitties,
          loading: false
        })
      })
  }

  render () {
    const {yourKitties, loading} = this.state
    return (
      <Container>
        <Row>
          <Col>
            {loading
              ? null
              : yourKitties.length === 0
                ? <p>No kitties :(</p>
                : <ul>
                  {yourKitties.map(kitty => <li key={kitty}>{kitty}</li>)}
                </ul>
            }
          </Col>
          <Col>
            <Adopt contract={this.kitties} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
