import React, { useEffect, useState, Fragment, useCallback } from "react";
import CampaignFactory from '../ethereum/src/CampaignFactory'

const Show = ({ campaigns }) =>
{
    return (
        <Fragment>
            <h1>Show Page</h1>
            {
                campaigns.map((campaign, index) => (
                    <p key={index}>{campaign}</p>
                ))
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