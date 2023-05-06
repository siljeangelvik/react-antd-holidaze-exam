import {Button} from '@mui/material';
import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext, useState} from 'react';
import RegisterVenueManager from '../components/manager/register/RegisterVenueManager';
import {AuthenticationContext} from '../context/AuthenticationContext';
import {UpdateAvatar} from '../components/forms/UpdateAvatar';
import RegisterAsManager from '../components/RegisterAsManager';
import CreateVenue from '../components/modals/CreateVenue';

function Profile() {
    const [toggle, setToggle] = useState(false);
    const {isManager, userProfileData} = useContext(AuthenticationContext);

    if (isManager) {
        console.log("isManager\nNeed to show venues to manage");
    } else {
        console.log(!!isManager);
        console.log("If user is not a venueManager and has a invalid email:\nDisplay nothing\n\nIf user is not a venueManager and has a valid email:\nDisplay option to register as a venueManager\n\nIf user is already a venueManager:\nDisplay a list of venues to manage");
    }

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <>
            <div style={{padding: "80px 40px", height: "95vh"}}>
                <Content>
                    <Content style={{paddingBottom: "40px"}}>
                        <Title level={1}>Your Profile</Title>
                        <Title level={4}>Here you can view and edit your profile information.</Title>
                    </Content>


                    <Content style={{paddingBottom: "40px", minHeight: "250px", width: "320px", margin: "0 auto"}}>
                        <UpdateAvatar/>
                    </Content>

                    <Content style={{minHeight: "250px", width: "320px", margin: "0 auto"}}>
                        <Content style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: "20px",
                        }}>
                            <Typography><strong>Name:</strong> {userProfileData?.name}</Typography>
                            <Typography><strong>Email:</strong> {userProfileData?.email}</Typography>
                            <Typography><strong>Manager:</strong> {isManager ? "Yes" : "No"}</Typography>
                        </Content>
                    </Content>

                    <Content style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: "20px",
                    }}>


                        {isManager && (
                            <RegisterVenueManager/>
                        )}




                        {isManager ? (
                            <>
                                <Title level={3}>Your Venues to Manage</Title>
                                <Title level={5}>You are currently managing <em>0</em> venues.</Title>

                                <div style={{display: "flex", flexWrap: "nowrap"}}>
                                    <Title level={3}>Create a Venue</Title>
                                    <Button onClick={handleToggle} variant="text" size="small">
                                        {toggle ? 'Close' : 'Open'}
                                    </Button>
                                </div>
                                {toggle ? <CreateVenue/> : null}
                            </>
                        ) : (
                            <>
                                <Button onClick={handleToggle} variant="text" size="small">
                                    {toggle ? 'Hide' : 'Register as Manager'}
                                </Button>
                                {toggle ? <RegisterAsManager/> : null}
                            </>
                        )}
                    </Content>
                </Content>
            </div>
        </>
    );
}

export default Profile;

/*
        {localStorage.getItem("token") === null &&
                        <>
                            <Title level={4}>You need to be logged in to view you profile.</Title>
                            <Button type="primary" href="/login">Go to login page</Button>
                        </>
                    }

                    {localStorage.getItem("token") !== null &&
                        <>

                            <Button danger
                                    icon={<LogoutOutlined/>}
                                    onClick={() => Logout()}
                            >
                                Logout
                            </Button>

                            <Title level={4}>You are currently logged in as <em>{localStorage.getItem("name")}</em></Title>
                            <Content style={{
                                display: "flex",
                                justifyContent: "start",
                                flexWrap: "wrap",
                                maxWidth: "100%",
                                gap: "20px",
                                alignItems: "center"
                            }}>
                                <Image
                                    src={localStorage.getItem("avatar") === null ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" : localStorage.getItem("avatar")}
                                    alt={localStorage.getItem("name")}
                                    style={{width: "70px", height: "70px", borderRadius: "50%"}}
                                />

                                <div>
                                    <Typography><strong>Email:</strong> {localStorage.getItem("email")}</Typography>
                                    <Typography><strong>Manager:</strong> {localStorage.getItem("manager") ? "No" : "Yes"}
                                    </Typography>
                                </div>
                            </Content>
                        </>
                    }
                </Content>
            </div>

            {localStorage.getItem("token") !== null &&
                <>
                    <Title level={3}>Your Venues to Manage</Title>
                    <Content style={{paddingBottom: "40px"}}>
                        <Title level={5}>You are currently managing <em>0</em> venues.</Title>
                    </Content>
                </>
            }
 */