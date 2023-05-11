import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext, useState} from 'react';
import {UpdateAvatar} from '../components/profile/avatar/UpdateAvatar';
import {CreateVenue} from '../components/forms/venue/CreateVenue';
import {Venues} from '../components/profile/Venues';
import {AuthenticationContext} from '../context/AuthenticationContext';

function Profile() {
    const [toggle, setToggle] = useState(false);
    const [editVenues, setEditVenues] = useState(false);
    const {isAuthenticated, isManager, data} = useContext(AuthenticationContext);

    console.log(data, "userProfileData");
    console.log(data?.name, "userProfileData?.name");

    if (isManager) {
        console.log("isManager\nNeed to show venues to manage");
        return (
            <>
                <CreateVenue/>
            </>
        );
    } else {
        console.log(!!isManager, "isManager value");
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

                    <Content style={{ minHeight: "250px", width: "320px", margin: "0 auto"}}>
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
                                    <Typography><strong>Name:</strong> {data?.name}</Typography>
                                    <Typography><strong>Email:</strong> {data?.email}</Typography>
                                    <Typography><strong>Manager:</strong> {isManager ? "Yes" : "No"}</Typography>
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

                        <ul style={{display:"flex", justifyContent:"space-between"}}>
                            <li>{!isManager && <button className={"primary-button"} onClick={setToggle}>Create a Venue</button>}</li>
                            <li>{!isManager && <button className={"secondary-button"} onClick={setEditVenues}>Edit a Venue</button>}</li>
                            <li>{!isManager && <button className={"secondary-button"} onClick={setToggle}>Delete a Venue</button>}</li>
                        </ul>

                        {editVenues && (<Venues/>)} {/*<EditVenues/>*/}

                        {!isManager && (<Venues/>)}

                        {/** IF USER IS NOT A MANAGER:
                         SHOW BUTTON TO REGISTER AS MANAGER
                         */}
                        {/* IF USER IS A MANAGER:
                        SHOW LIST OF VENUES THEY MANAGE +
                        BUTTON(TO OPEN MODAL) CREATE NEW VENUE +
                        BUTTON(TO DELETE SELECTED VENUE)
                        BUTTON(EDIT SELECTED VENUE)
                        */}
                        {/** IF USER IS // IS NOT A VENUE MANAGER:

                         DONE:

                         IF USER IS A VENUE MANAGER THEN::::::
                         - SHOW LIST OF VENUES THEY MANAGE +
                         - BUTTON (OPEN MODAL) CREATE VENUE +
                         -

                         IF USER IS NOT A VENUE MANAGER THEN::::::
                         - BUTTON (OPEN SECTION) REGISTER AS MANAGER +


                         **/}
                        {/*
                         {!isManager ? (
                            <>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    {toggle ?
                                        (<button onClick={handleToggle}
                                                 style={{
                                                     position: "fixed",
                                                     top: "12%",
                                                     left: "80%",
                                                     padding: "9px",
                                                     backgroundColor: "#ff9900",
                                                     border: "2px solid transparent",
                                                     borderRadius: "7px",
                                                     color: "#fff",
                                                     fontWeight: "bold",
                                                     zIndex: "110"
                                                 }}>
                                                Close
                                            </button>
                                        ) : (
                                            <button onClick={handleToggle}
                                                    style={{
                                                        position: "relative",
                                                        padding: "9px",
                                                        backgroundColor: "transparent",
                                                        border: "2px solid transparent",
                                                        borderRadius: "7px",
                                                        color: "#ff9900",
                                                        fontWeight: "bold",
                                                    }}>
                                                Open
                                            </button>
                                        )
                                    }
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
                        )}*/}
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