import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {useContext} from 'react';
import React from 'react';
import {AuthenticationContext} from '../../context/AuthenticationContext';

export const Venues = () => {

    const {isAuthenticated, isManager, userData} = useContext(AuthenticationContext);

    return (
        <>
            {isAuthenticated && (
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={3}>Your Venues to Manage</Title>
                    <Title level={5}>You are currently managing <em>{userData?.venues?.length}</em> venues.</Title>
                    <Typography><strong>Venues:</strong> {userData?.venues && !isManager ? (
                        userData?.venues?.map((venue) => (
                            <div key={venue.id}>
                                <p>{venue.name}</p>
                            </div>
                        ))
                    ) : (
                        <em>You are not managing any venues.</em>
                        )}</Typography>
                </Content>
            )}
        </>
    );
}