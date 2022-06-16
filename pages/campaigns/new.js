import React, { useState } from "react";
import { Form, Button, Label, Input } from 'semantic-ui-react';

import Layout from '../../components/layout'

const NewCampaign = () =>
{
    const [minimum, setMinimum] = useState('0')

    const onMinimumChanged = (e, data) =>
    {
        setMinimum(data.value)
    }

    return (
        <Layout>
            <h3>Create New Campaign</h3>
            <Form>
                <Form.Field>
                    <label>Minimum Contributor</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        type="number"
                        value={minimum}
                        onChange={onMinimumChanged}
                    />
                </Form.Field>
                <Button primary type="submit">Submit</Button>
            </Form>
        </Layout>
    )
}

export default NewCampaign