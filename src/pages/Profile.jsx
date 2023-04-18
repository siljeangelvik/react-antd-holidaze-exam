import {LogoutOutlined} from '@ant-design/icons';
import {Button, Image, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {Logout} from '../components/buttons/Logout';

export function Profile() {

    return (
        <div>

            <Content style={{paddingBottom: "40px"}}>
                <Title level={1}>Your Profile</Title>


                {localStorage.getItem("token") === null &&
                    <>
                        <Title level={4}>You are currently not logged in.</Title>
                        <Button type="primary" href="/login">Login</Button>
                        <Button type="primary" href="/login" style={{marginRight:"20px"}}>Register</Button>
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

            {localStorage.getItem("token") !== null &&
                <>
                    <Title level={3}>Your Venues to Manage</Title>
                    <Content style={{paddingBottom: "40px"}}>
                        <Title level={5}>You are currently managing <em>0</em> venues.</Title>
                    </Content>
                </>
            }


        </div>
    );
}