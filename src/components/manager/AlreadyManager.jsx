import {Button} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {CreateVenue} from '../../components/forms/venue/CreateVenue';
import useToggle from '../../hooks/useToggle';
import {AuthenticationContext} from '../../context/AuthenticationContext';
import './styles.css';

const AlreadyManager = () => {

    const {isManager, userProfileData} = useContext(AuthenticationContext);

    const [toggle, setToggle] = useToggle(false);

    return (
        <div>
            <Content style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "20px",
            }}>

                {isManager && (
                    <div>
                        <div>
                            <Button onClick={setToggle}>Create a Venue</Button>
                        </div>
                        {toggle && (<CreateVenue setToggle={setToggle}/>)}
                    </div>
                )}

                {isManager && (
                    <div>
                        <Title level={2}>Welcome {userProfileData?.name}</Title>
                        <Title level={4}>You are not a Venue Manager</Title>
                        <Button onClick={setToggle}>Register as Venue Manager</Button>
                    </div>
                )}
            </Content>
        </div>
    );
};

export default AlreadyManager;