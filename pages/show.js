import React, { useEffect, useState, Fragment, useCallback } from "react";
import CampaignFactory from '../ethereum/src/CampaignFactory'
import { Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

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
        <Fragment>
            <h1>Show Page</h1>
            {
                renderCampaigns()
            }
        </Fragment>
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