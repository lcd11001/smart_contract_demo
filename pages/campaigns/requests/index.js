import React from "react";
import Layout from "../../../components/layout";
import { Button } from "semantic-ui-react";
import { Link } from '../../../routes'

const RequestsIndex = ({ address }) =>
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
    return {
        props: {
            address: props.query.address
        }
    }
}

export default RequestsIndex