import React from "react";
import Layout from "../../../components/layout";

const RequestNew = ({ address }) =>
{
    return (
        <Layout>
            <h3>RequestNew {address}</h3>
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

export default RequestNew