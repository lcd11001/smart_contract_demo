import React from "react";
import Layout from "../../../components/layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from '../../../routes'
import Campaign from "../../../ethereum/src/Campaign";
import RequestRow from "../../../components/RequestRow";

const RequestsIndex = ({ address, requests, requestCount, approversCount }) =>
{
    const renderRows = () =>
    {
        return requests.map((request, index) => (
            <RequestRow
                key={index}
                id={index}
                request={request}
                address={address}
                approversCount={approversCount}
            />
        ))
    }
    const renderTable = () =>
    {
        const { Header, Row, HeaderCell, Body } = Table
        return (
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>

                <Body>
                    {
                        renderRows()
                    }
                </Body>
            </Table>
        )
    }

    return (
        <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
            {
                renderTable()
            }
        </Layout>
    )
}

export const getServerSideProps = async (props) =>
{
    const { address } = props.query
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()
    const approversCount = await campaign.methods.approversCount().call()

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
            requestCount,
            approversCount
        }
    }
}

export default RequestsIndex