import {Button} from '@mui/material';
import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {profileAccessToken, profileEmail, profileManager, profileName} from '../utilities/constants';
import useApiGet from '../hooks/useApiGet';
import ProfileMenu from '../components/profile/ProfileMenu';
import UpdateAvatar from '../components/profile/UpdateAvatar';

export default function Profile() {

    console.log(`https://nf-api.onrender.com/api/v1/holidaze/profiles/${profileName}`);
    const {data} = useApiGet(`https://nf-api.onrender.com/api/v1/holidaze/profiles/${profileName}`);

    const isLoggedIn = profileAccessToken;

    const initialManagerRole = data.venueManager;
    const [toggleManager, setToggleManager] = useState(true);
    console.log(initialManagerRole);


    if (isLoggedIn) {
        console.log(data);
    }
    if (!isLoggedIn) {
        return <Navigate replace to="/login"/>;
    }


    function updateManager() {
        setToggleManager(false);
        localStorage.removeItem("manager")
        localStorage.setItem("manager", !initialManagerRole);
        /*
        if (initialManagerRole === false) {
            localStorage.setItem("manager", true);
            setToggleManager(false);
            console.log("You are able to create, update and delete venues")
        }

        if (initialManagerRole === true) {
            localStorage.setItem("manager", false);
            setToggleManager(true);
            console.log("You are NOT a venue manager");
        }
    */
    }

    console.log(initialManagerRole, "initialManagerRole");
    console.log(toggleManager, "toggleManager");

    return (
        <>
            <Content style={{paddingBottom: "40px"}}>
                <Title level={1}>{data.name}</Title>
                <Title level={4}>Here you can view your profile information and upload a profile picture.</Title>
            </Content>

            <Content style={{minHeight: "250px", width: "320px", margin: "0 auto"}}>
                <UpdateAvatar/>
            </Content>

            <Content style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "20px",
            }}>
                <Typography><strong>User ID:</strong> {data.id}</Typography>
                <Typography><strong>Name:</strong> {profileName}</Typography>
                <Typography><strong>Email:</strong> {profileEmail}</Typography>
                <Typography><strong>Manager:</strong> {profileManager} || {profileManager ? "Yes" : "No"}</Typography>
                <Typography><strong>Manager:</strong> {initialManagerRole ? "Yes" : "No"}</Typography>
            </Content>

            <Content style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "20px",
            }}>

                <ProfileMenu/>

            </Content>
        </>
    );
}


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