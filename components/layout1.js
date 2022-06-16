import React from 'react';
import { Container } from 'semantic-ui-react'
import Header from './header1';

const Layout = (props) =>
{
    return (
        <Container>
            <Header />
            {props.children}
        </Container>
    )
};

export default Layout;