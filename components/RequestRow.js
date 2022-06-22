import React, { useState } from "react";
import { Table, Button } from "semantic-ui-react";

import Campaign from "../ethereum/src/Campaign";
import web3 from "../ethereum/src/web3";

const RequestRow = ({ id, request, address, approversCount }) =>
{
    const LOADING_BUTTON = {
        NONE: 0,
        APPROVE: 1,
        FINALIZE: 2
    }
    const { Row, Cell } = Table
    const [isLoading, setIsLoading] = useState(LOADING_BUTTON.NONE)
    const [errorMessage, setErrorMessage] = useState('')


    const onApproveClicked = async (e) =>
    {
        setIsLoading(LOADING_BUTTON.APPROVE)
        try
        {
            const campaign = Campaign(address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.approveRequest(id).send({
                from: accounts[0]
            })
        }
        catch (err)
        {
            setErrorMessage(err.message)
        }
        setIsLoading(LOADING_BUTTON.NONE)
    }

    const onFinalizeClicked = (e) =>
    {

    }

    return (
        <Row>
            <Cell textAlign="center">{id + 1}</Cell>
            <Cell>{request.description}</Cell>
            <Cell textAlign="right">{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell textAlign="center">{request.approvalCount} / {approversCount}</Cell>
            <Cell>
                <Button color="green" basic onClick={onApproveClicked} loading={isLoading === LOADING_BUTTON.APPROVE}>
                    Approve
                </Button>
            </Cell>
            <Cell>
                <Button color="red" basic onClick={onFinalizeClicked} loading={isLoading === LOADING_BUTTON.FINALIZE}>
                    Finalize
                </Button>
            </Cell>
        </Row>
    )
}

export default RequestRow