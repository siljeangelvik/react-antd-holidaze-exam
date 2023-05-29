import {UserOutlined} from '@ant-design/icons';
import {Space} from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';

const Owner = () => {
    const {specificVenue} = useContext(VenuesContext);

    return (
        <>
            {/* Owner "Section" */}
            <Title level={3}>Owner of Venue</Title>
            <div style={{display: "flex", gap: "10px"}}>
                <Space direction="vertical" size={16}>
                    <Space wrap size={16}>
                        {specificVenue?.owner.avatar
                            ? <Avatar size={64} icon={<img src={specificVenue?.owner?.avatar} alt={specificVenue?.owner?.name}/>} />
                            : <Avatar size={64} icon={<UserOutlined/>} />}
                    </Space>
                </Space>
                <div style={{display: "flex", flexDirection: "column", gap: "10px", alignItems: "baseline"}}>
                    <span><strong>Host: </strong>{specificVenue?.owner.name ? specificVenue?.owner.name : "N/A"}</span>
                    <span><strong>Contact: </strong>{specificVenue?.owner.email ? specificVenue?.owner.email : "N/A"}</span>
                </div>
            </div>
        </>
    );
};

export default Owner;