import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import useManagerStatus from '../hooks/useManagerStatus';
import {UpdateAvatar} from '../components/form/avatar/UpdateAvatar';
import {AuthenticationContext} from '../context/AuthenticationContext';

function Profile() {
    const { isAuthenticated, userProfile } = useContext(AuthenticationContext);
    const isManager = useManagerStatus();

    return (
        <>
            <div style={{minHeight: '95vh', padding: '80px 40px'}}>
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={1}>Your Profile</Title>
                    {isAuthenticated ? (<Title level={4}>Welcome back to your profile, {userProfile?.name}</Title>)
                     : (<Title level={4}>Here you can view and edit your profile information.</Title>)}
                </Content>
                <Content style={{minHeight: "250px", width: "320px", margin: "0 auto"}}>
                    <UpdateAvatar/>
                </Content>

                <Content style={{minHeight: "250px", width: "320px", margin: "0 auto"}}>
                    <Content style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: "20px",
                    }}>
                        {isAuthenticated && (
                            <>
                                <Typography><strong>Name:</strong> {userProfile?.name}</Typography>
                                <Typography><strong>Email:</strong> {userProfile?.email}</Typography>
                                <Typography><strong>Manager:</strong> {isManager ? "Yes" : "No"}</Typography>
                            </>
                        )}
                    </Content>
                </Content>
            </div>
        </>
    );
}

export default Profile;