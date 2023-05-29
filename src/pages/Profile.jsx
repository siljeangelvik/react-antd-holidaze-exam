import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {UpdateManager} from '../components/form/manager/UpdateManager';
import useManagerStatus from '../hooks/useManagerStatus';
import {UpdateAvatar} from '../components/form/avatar/UpdateAvatar';
import {AuthenticationContext} from '../context/AuthenticationContext';

function Profile() {
    const { isAuthenticated, userProfile } = useContext(AuthenticationContext);
    const isManager = useManagerStatus();
    const { updateManager, isLoading, hasError, data, response, error } = UpdateManager();

    const handleUpdateManager = (id) => {
        if (!isManager) {
            // Update the userProfile.venueManager value using the updateManager function
            updateManager(id, { venueManager: true });
        }
        console.log("You are now a manager!");
    };

    return (
        <div style={{padding:"80px 20px 120px 20px", minHeight: "95vh"}}>
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={1}>Your Profile</Title>
                    {isAuthenticated ? (<Title level={4}>Welcome back, {userProfile?.name}! </Title>)
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
                        <Typography><strong>Name:</strong> {userProfile?.name}</Typography>
                        <Typography><strong>Email:</strong> {userProfile?.email}</Typography>
                        <Typography><strong>Manager:</strong> {isManager ? "Yes" : "No"}</Typography>
                    </Content>

                    {isLoading && <p>Loading...</p>}
                    {hasError && <p>{error}</p>}
                    {response && <p>{data}</p>}
                    {!isManager && (
                        <button onClick={() => handleUpdateManager(userProfile?.id)}>Become a Manager</button>
                    )}
                </Content>
        </div>
    );
}

export default Profile;