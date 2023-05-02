import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import {Typography} from 'antd';
import React from 'react';

const Footer = () => {
    return (
        <nav className={"nav"}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography.Text style={{color:"white"}}>
                            copyright - @2023 Holidaze
                        </Typography.Text>
                    </Toolbar>
                </Container>
            </AppBar>
        </nav>
    );
};

export default Footer;
