import React, { useState } from "react";
import Layout from "../../components/layout";

import Campaign from '../../ethereum/src/Campaign'

const ShowCampaign = ({ address }) =>
{
    return (
        <Layout>
            <h3>ShowCampaign</h3>
            <h5>{address}</h5>
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
            
        }
    }
}

export default ShowCampaign