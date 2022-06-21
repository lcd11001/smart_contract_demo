import React, { useState } from "react";
import { Card, Grid } from "semantic-ui-react";
import Layout from "../../components/layout";

import Web3 from "web3";
import Campaign from '../../ethereum/src/Campaign'
import ContributeForm from "../../components/ContributeForm";

const ShowCampaign = ({ minimumContribution, balance, requestsCount, approversCount, manager, address }) =>
{
    const renderDetails = () =>
    {
        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: {
                    overflowWrap: 'break-word'
                }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to becom an approver',
            },
            {
                header: requestsCount,
                meta: 'Number of requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                description: 'Number of people who have already donated to this campaign',
            },
            {
                header: Web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign balance (ether)',
                description: 'The balance is how much money this capaign has left to spend',
            },
        ]

        return <Card.Group items={items} />
    }

    const renderContributeForm = () =>
    {
        return <ContributeForm address={address} />
    }

    return (
        <Layout>
            <h3>Campaign details</h3>
            <Grid>
                <Grid.Column width={10}>
                    {
                        renderDetails()
                    }
                </Grid.Column>
                <Grid.Column width={6}>
                    {
                        renderContributeForm()
                    }
                </Grid.Column>
            </Grid>
        </Layout>
    )
}

export const getServerSideProps = async (props) =>
{
    const address = props.query.address
    const campaign = Campaign(address)

    const summary = await campaign.methods.getSummary().call()
    console.log('summary', summary)

    return {
        props: {
            minimumContribution: summary['0'],
            balance: summary['1'],
            requestsCount: summary['2'],
            approversCount: summary['3'],
            manager: summary['4'],
            address: address
        }
    }
}

export default ShowCampaign