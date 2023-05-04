import Container from '@mui/material/Container';
import {Typography} from 'antd';
import React from 'react';
import "../styles.css";

const Footer = () => {
    return (
        <div className="navbar-container">
            <Container maxWidth="xl">
                <Typography.Text style={{color: "white", display: "flex", justifyContent: "center", alignItems: "baseline"}}>
                    Copyright © 2023 &nbsp; <span className="logo" style={{fontSize:"0.8rem", letterSpacing:"0.1rem"}}>S.Angelvik</span>. All Rights Reserved.
                </Typography.Text>
            </Container>
        </div>
    );
};

export default Footer;