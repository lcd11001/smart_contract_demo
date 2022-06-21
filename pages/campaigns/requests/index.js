import React from "react";
import Layout from "../../../components/layout";
import { Button } from "semantic-ui-react";
import { Link } from '../../../routes'
import Campaign from "../../../ethereum/src/Campaign";

const RequestsIndex = ({ address, requests, requestCount }) =>
{
    return (
        <Layout>
            <h3>Requests {address}</h3>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
        </Layout>
    )
}

export const getServerSideProps = async (props) =>
{
    const { address } = props.query
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()

    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map(async (_, index) =>
        {
            return campaign.methods.requests(index).call().then(result => ({
                description: result.description,
                value: result.value,
                recipient: result.recipient,
                complete: result.complete,
                approvalCount: result.approvalCount
            }))
        })
    )

    return {
        props: {
            address,
            requests,
            requestCount
        }
    }
}

export default RequestsIndex