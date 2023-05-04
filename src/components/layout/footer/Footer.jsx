import Container from '@mui/material/Container';
import {Typography} from 'antd';
import React from 'react';
import "../navbar/styles.css";

const Footer = () => {
    return (
        <div className="navbar-container">
            <Container maxWidth="xl">
                <Typography.Text style={{color: "white", display: "flex", justifyContent: "center", alignItems: "baseline", fontSize:"9px"}}>
                    Copyright © 2023&nbsp;<span className="logo" style={{fontSize:"10px", letterSpacing:"0"}}>S.Angelvik</span>. All Rights Reserved.
                </Typography.Text>
            </Container>
        </div>
    );
};

export default Footer;