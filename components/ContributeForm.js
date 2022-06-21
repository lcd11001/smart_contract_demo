import React, { useState } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Campaign from '../ethereum/src/Campaign'
import web3 from '../ethereum/src/web3'

const ContributeForm = ({ address }) =>
{
    const [value, setValue] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onValueChanged = (e, data) =>
    {
        setValue(data.value)
    }

    const onSubmit = async (e) =>
    {
        e.preventDefault()
        setLoading(true)
        setErrorMessage('')

        try
        {
            const campaign = Campaign(address)
            const accounts = await web3.eth.getAccounts()

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            })
        }
        catch (err)
        {
            setErrorMessage(err.message)
        }

        setLoading(false)
    }

    return (
        <Form onSubmit={onSubmit} error={errorMessage.length !== 0}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    label='ether'
                    labelPosition='right'
                    type="number"
                    value={value}
                    onChange={onValueChanged}
                />
            </Form.Field>

            <Message
                error
                header="Oops!"
                content={errorMessage}
            />

            <Button
                primary
                type='submit'
                loading={isLoading}
            >
                Contribute
            </Button>
        </Form>
    )
}

export default ContributeForm