import React, { useEffect, useState, Fragment, useCallback } from "react";
import CampaignFactory from '../ethereum/src/CampaignFactory'
import { Card, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import Layout from "../components/layout";

const Show = ({ campaigns }) =>
{
    const renderCampaigns = () =>
    {
        const items = campaigns.map(address => ({
            header: address,
            description: <a>View Campaign</a>,
            fluid: true
        }))

        return <Card.Group items={items} />
    }

    return (
        <Layout>
            <h3>Open Campaigns</h3>
            <div>
                <Button
                    floated="right"
                    content="Create Campaign"
                    icon="add circle"
                    primary
                />
                {
                    renderCampaigns()
                }
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () =>
{
    const campaigns = await CampaignFactory.methods.getDeployedCampaigns().call()
    return {
        props: {
            campaigns
        }
    }
}

export default Show