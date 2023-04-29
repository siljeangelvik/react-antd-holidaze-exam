import {Button} from '@mui/material';
import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import HandleLogout from '../utilities/HandleLogout';
import {CreateVenue} from '../components/modals/CreateVenue';
import UpdateAvatar from '../components/profile/UpdateAvatar';
import {profileEmail, profileManager, profileName, profileAccessToken, profileAvatar} from '../utilities/constants';

function Profile() {

    const navigate = useNavigate();

    if (profileAccessToken === null) {
        console.log("No token found, redirecting to login page.");
        navigate("/login");
    }

    console.log(profileName);
    document.title = profileName;

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <Content style={{paddingBottom: "40px"}}>
                <Title level={1}>Your Profile</Title>
                <Title level={4}>Here you can view your profile information and upload a profile picture.</Title>
            </Content>

            <Content style={{minHeight: "250px", width:"320px", margin:"0 auto"}}>
                <HandleLogout/>
                <UpdateAvatar putAvatar={profileAvatar}/>
                <Content style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "20px",
                }}>
                    <Typography><strong>Name:</strong> {profileName}</Typography>
                    <Typography><strong>Email:</strong> {profileEmail}</Typography>
                    <Typography><strong>Manager:</strong> {profileManager ? "No" : "Yes"}</Typography>
                </Content>
            </Content>

            <Content style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "20px",
            }}>

                {profileManager &&
                    <>
                        <Title level={3}>Your Venues to Manage</Title>
                        <Title level={5}>You are currently managing <em>0</em> venues.</Title>

                        <div style={{display:"flex", flexWrap:"nowrap"}}>
                            <Title level={3}>Create a Venue</Title>
                            <Button onClick={toggleOpen} variant="text" size="small">{isOpen ? 'Close' : 'Open'}</Button>
                        </div>
                        {isOpen ? <CreateVenue/> : null}

                    </>
                }
            </Content>
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