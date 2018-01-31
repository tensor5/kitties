import {range} from 'lodash'
import React, {Component} from 'react'
import {Button, Form, FormGroup, Input, Label} from 'reactstrap'

class Adopt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  handleOptionChange (changeEvent) {
    this.setState({
      selected: Number(changeEvent.target.value)
    })
  }

  adopt (e) {
    e.preventDefault()
    const {contract} = this.props
    contract.methods.adopt(this.state.selected).send()
  }

  render () {
    const {selected} = this.state
    return <Form onSubmit={(e) => this.adopt(e)}>
      <FormGroup tag='fieldset'>
        {range(16).map(i => (
          <FormGroup key={i} check>
            <Label check>
              <Input
                type='radio'
                name='kitty'
                value={i}
                checked={selected === i}
                onChange={(e) => this.handleOptionChange(e)}
              />{' '}
              Kitty {i}
            </Label>
          </FormGroup>
        ))}
      </FormGroup>
      <Button type='submit' disabled={selected == null}>Adopt</Button>
    </Form>
  }
}

export default Adopt
