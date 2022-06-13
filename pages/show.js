import React, { useEffect, useState, Fragment, useCallback } from "react";
import CampaignFactory from '../ethereum/src/CampaignFactory'

export default () =>
{
    const [deployedCampaigns, setDeployedCampaigns] = useState([])

    const getDeployedCampaigns = useCallback(async () =>
    {
        const campaigns = await CampaignFactory.methods.getDeployedCampaigns().call()
        console.log('campaigns', campaigns)
        setDeployedCampaigns(campaigns)
    }, [])

    useEffect(() =>
    {
        getDeployedCampaigns()
    }, [getDeployedCampaigns])

    return (
        <Fragment>
            <h1>Show Page</h1>
            {
                deployedCampaigns.map((campaign, index) => (
                    <p key={index}>{campaign}</p>
                ))
            }
        </Fragment>
    )
}