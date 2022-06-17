import React, { useState } from "react";
import { Form, Button, Message, Input } from 'semantic-ui-react';

import Layout from '../../components/layout'

import CampaignFatory from '../../ethereum/src/CampaignFactory'
import web3 from '../../ethereum/src/web3'

const NewCampaign = () =>
{
    const [minimum, setMinimum] = useState('0')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onMinimumChanged = (e, data) =>
    {
        setMinimum(data.value)
    }

    const onSubmit = async (e, data) =>
    {
        e.preventDefault()

        setIsLoading(true)
        setErrorMessage('')

        try
        {

            const accounts = await web3.eth.getAccounts()

            await CampaignFatory.methods
                .createCampaign(minimum)
                .send({
                    from: accounts[0]
                })
        }
        catch (err)
        {
            setErrorMessage(err.message)
        }

        setIsLoading(false)
    }

    return (
        <Layout>
            <h3>Create New Campaign</h3>
            <Form onSubmit={onSubmit} error={errorMessage.length !== 0}>
                <Form.Field>
                    <label>Minimum Contributor</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        type="number"
                        value={minimum}
                        onChange={onMinimumChanged}
                    />
                </Form.Field>

                <Message
                    error
                    header="Oops!"
                    content={errorMessage}
                />

                <Button
                    loading={isLoading}
                    disabled={isLoading}
                    primary
                    type="submit"
                >
                    Submit
                </Button>
            </Form>
        </Layout>
    )
}

export default NewCampaign