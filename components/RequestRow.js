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

    const getRevertReason = async (txHash) =>
    {

        try
        {

            const tx = await web3.eth.getTransaction(txHash)

            console.log('tx', tx)

            var result = await web3.eth.call(tx, tx.blockNumber)

            console.log('result', result)

            result = result.startsWith('0x') ? result : `0x${result}`

            if (result && result.substr(138))
            {
                const reason = web3.utils.toAscii(result.substr(138))
                console.log('Revert reason:', reason)
                // return reason
            }
            else
            {
                console.log('Cannot get reason - No return value')
            }
        }
        catch (err)
        {
            console.log('err2', err)
            console.log('err2.message', err.message)
            var errData = JSON.parse(err.message.substr(err.message.indexOf('{')))
            if (errData)
            {
                console.log('errData', errData)
            }
        }

        return txHash
    }

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
            console.log('onApproveClicked error', err)
            setErrorMessage(err.message)
        }
        setIsLoading(LOADING_BUTTON.NONE)
    }

    const onFinalizeClicked = async (e) =>
    {
        setIsLoading(LOADING_BUTTON.FINALIZE)
        try
        {
            const campaign = Campaign(address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.finalizeRequest(id).send(
                {
                    from: accounts[0],
                },
                async (error, transactionHash) =>
                {
                    console.log('callback error', error, 'transactionHash', transactionHash)
                    if (transactionHash)
                    {
                        await getRevertReason(transactionHash)
                    }
                }
            )
        }
        catch (err)
        {
            console.log('onFinalizeClicked error', err)
            setErrorMessage(err.message)
        }
        setIsLoading(LOADING_BUTTON.NONE)
    }

    const readyToFinalize = request.approvalCount > (approversCount / 2)

    return (
        <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
            <Cell textAlign="center">{id + 1}</Cell>
            <Cell>{request.description}</Cell>
            <Cell textAlign="right">{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell textAlign="center">{request.approvalCount} / {approversCount}</Cell>
            <Cell>
                {
                    !request.complete &&
                    <Button color="green" basic onClick={onApproveClicked} loading={isLoading === LOADING_BUTTON.APPROVE}>
                        Approve
                    </Button>
                }
            </Cell>
            <Cell>
                {
                    !request.complete &&
                    <Button color="red" basic onClick={onFinalizeClicked} loading={isLoading === LOADING_BUTTON.FINALIZE}>
                        Finalize
                    </Button>
                }
            </Cell>
        </Row>
    )
}

export default RequestRow