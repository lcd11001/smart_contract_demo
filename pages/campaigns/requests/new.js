import React, { useState } from "react";
import Layout from "../../../components/layout";
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Campaign from "../../../ethereum/src/Campaign";
import web3 from "../../../ethereum/src/web3";
import { Link } from '../../../routes'

const RequestNew = ({ address }) =>
{
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [recipient, setRecipient] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onInputChanged = (func) => (e, data) =>
    {
        func(data.value)
    }

    const onSubmit = async (e) =>
    {
        e.preventDefault()
        setErrorMessage('')
        setIsLoading(true)

        try
        {
            const campaign = new Campaign(address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({
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
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={errorMessage.length !== 0}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={onInputChanged(setDescription)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={value}
                        type='Number'
                        label='Ether'
                        labelPosition="right"
                        onChange={onInputChanged(setValue)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={recipient}
                        onChange={onInputChanged(setRecipient)}
                    />

                </Form.Field>

                <Message
                    error
                    header="Oops!"
                    content={errorMessage} />

                <Button
                    primary
                    type="submit"
                    loading={isLoading}
                >
                    Create
                </Button>
            </Form>
        </Layout>
    )
}

export const getServerSideProps = async (props) =>
{
    return {
        props: {
            address: props.query.address
        }
    }
}

export default RequestNew