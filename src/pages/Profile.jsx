import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext, useState} from 'react';
import {UpdateAvatar} from '../components/profile/avatar/UpdateAvatar';
import {CreateVenue} from '../components/forms/venue/CreateVenue';
import {AuthenticationContext} from '../context/AuthenticationContext';

function Profile() {
    const [toggle, setToggle] = useState(false);
    const {isAuthenticated, isManager, userData} = useContext(AuthenticationContext);

    if (isManager) {
        console.log("isManager\nNeed to show venues to manage");
        return (<CreateVenue/>);
    } else {
        console.log(!isManager, "isManager value");
        console.log("If user is not a venueManager and has a invalid email:\nDisplay nothing\n\nIf user is not a venueManager and has a valid email:\nDisplay option to register as a venueManager\n\nIf user is already a venueManager:\nDisplay a list of venues to manage");
    }

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <>
            <div style={{minHeight: '95vh', padding: '80px 40px'}}>
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={1}>Your Profile</Title>
                    <Title level={4}>Here you can view and edit your profile information.</Title>
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
                                <Typography><strong>Name:</strong> {userData?.name}</Typography>
                                <Typography><strong>Email:</strong> {userData?.email}</Typography>
                                <Typography><strong>Manager:</strong> {userData?.venueManager ? "Yes" : "No"}</Typography>
                            </>
                        )}
                    </Content>
                </Content>

                <Content style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "20px",
                }}>

                    {toggle && (
                        <>
                            <button className={"secondary-button modal-close"} onClick={handleToggle}>Close</button>
                            <CreateVenue/>
                        </>
                    )}

                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <button className={"primary-button"} onClick={setToggle}>Create a Venue</button>
                        <button className={"secondary-button"}>Edit a Venue</button>
                        <button className={"secondary-button"} onClick={setToggle}>Delete a Venue</button>
                    </div>
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