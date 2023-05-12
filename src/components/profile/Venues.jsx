import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {useContext, useEffect} from 'react';
import React from 'react';
import {API_PROFILES} from '../../utilities/constants';
import useApiGet from '../../hooks/useApiGet';
import {AuthenticationContext} from '../../context/AuthenticationContext';

export const Venues = () => {

    const {isAuthenticated, isManager} = useContext(AuthenticationContext);

    const {data} = useApiGet(`${API_PROFILES}/${localStorage.getItem("name")}/venues`);
    console.log(data, "data from components > profile > venues");


    return (
        <>
            {isAuthenticated && (
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={3}>Your Venues to Manage</Title>
                    <Title level={5}>You are currently managing <em>{data?.length}</em> venues.</Title>
                    <Typography><strong>Venues:</strong> {data && !isManager ? (
                        data?.map((venue) => (
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